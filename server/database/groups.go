package database

import (
	"errors"
	"sync"

	"github.com/lib/pq"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateGroup(author string, newGroup model.NewGroup) (model.Group, error) {
	group := newGroup.ToDatabaseModel()
	group.ID = utils.GenerateId()
	group.Author = author

	err := db.Create(&group)
	return group.ToGroup(), err.Error
}

func GetGroup(id string) (model.Group, error) {
	var group model.GroupModel
	err := db.Where("id = ?", id).First(&group)
	return group.ToGroup(), err.Error
}

func GetGroups(ids []string) ([]*model.Group, error) {
	var groups []*model.Group
	var err error
	var wg sync.WaitGroup
	for _, id := range ids {
		wg.Add(1)
		o := id
		go func() {
			defer wg.Done()
			var group model.GroupModel
			err = db.Where("id = ?", o).First(&group).Error
			g := group.ToGroup()
			groups = append(groups, &g)
		}()
	}
	wg.Wait()
	return groups, err
}

func DeleteGroup(id string) (bool, error) {
	var group model.GroupModel
	var err error
	var ok bool = false

	findGroupErr := db.Where("id = ?", id).First(&group).Error

	if findGroupErr != nil {
		err = e.GROUP_NOT_FOUND
	} else {
		dError := db.Where("id = ?", id).Delete(&group).Error
		if dError != nil {
			err = errors.New("failed to delete root group")
		}
		userDeletionErr := UserDeleteGroup(group.Author, id)
		if userDeletionErr != nil {
			err = userDeletionErr
		} else {
			var childGroupIds pq.StringArray = group.ChildGroups
			for _, c := range childGroupIds {
				DeleteGroup(c)
			}
			ok = true
		}

	}
	return ok, err

}

func GroupAuthor(groupId string) (string, error) {
	var g model.GroupModel
	var err error
	findErr := db.Where("id = ?", groupId).First(&g).Error
	if findErr != nil {
		err = e.GROUP_NOT_FOUND
	}
	return g.Author, err
}

func GroupAddMember(groupId, member string) (bool, error) {
	var err error
	var ok bool
	var group model.GroupModel

	get_err := db.Where("id = ?", groupId).First(&group).Error
	if get_err != nil {
		err = get_err
		ok = false
	} else {
		var members pq.StringArray = group.Members
		isRegistered, _ := UserIsRegisteredById(member)

		if isRegistered {
			userExists := utils.ItemExistsInStringSlice(member, group.Members)
			if userExists {
				err = e.USER_IN_GROUP
			}
			members = append(members, member)
			updateErr := db.Model(&group).Where("id = ?", groupId).Update("members", members).Error

			if updateErr != nil {
				err = updateErr
				ok = false
			} else {
				ok = true
			}
		} else {
			err = e.USER_NOT_FOUND
		}
	}

	return ok, err
}

func GroupRemoveMember(groupId, member string) (bool, error) {
	var err error
	var ok bool
	var group model.GroupModel

	findErr := db.Where("id = ?", groupId).First(&group).Error
	if findErr != nil {
		err = e.GROUP_NOT_FOUND
	} else {
		var members pq.StringArray
		memberExists := utils.ItemExistsInStringSlice(member, group.Members)
		if memberExists {
			members = utils.RemoveDuplicateStringFromSlice(group.Members, member)
			updateErr := db.Model(&group).Where("id = ?", groupId).Update("members", members).Error
			if updateErr != nil {
				err = e.GROUP_UPDATE_FAILED
			} else {
				ok = true
			}
		} else {
			err = e.USER_NOT_IN_GROUP
		}

	}

	return ok, err
}

func GroupAddChild(author, parentGroupId string, newGroup model.NewGroup) (model.Group, error) {
	var err error
	var group model.Group
	findErr := db.Where("id = ?", parentGroupId).First(&group)
	if findErr != nil {
		err = e.GROUP_NOT_FOUND
	} else {
		ng := newGroup.ToDatabaseModel()
		ng.ParentGroup = parentGroupId
		ng.ID = utils.GenerateId()
		ng.Author = author

	}
	return group, err
}

func GroupExists(id string) (bool, error) {
	var groups []model.GroupModel

	err := db.Where("id = ?", id).Find(&groups).Error

	return len(groups) > 0, err
}
