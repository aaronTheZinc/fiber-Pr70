package database

import (
	"errors"
	"fmt"

	"github.com/lib/pq"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateGroup(author string, newGroup model.NewGroup) (model.Group, error) {
	group := newGroup.ToDatabaseModel()
	group.ID = utils.GenerateUID()
	group.Author = author

	fmt.Println("passed in id: " + author)
	err := db.Create(&group)
	return group.ToGroup(), err.Error
}

func GetGroup(id string) (model.Group, error) {
	var group model.Group
	err := db.Where("id = ?", id).First(&group)
	return group, err.Error
}

func GetGroups(ids []string) ([]*model.Group, error) {
	var groups []*model.Group
	var err error
	for _, id := range ids {
		var group model.GroupModel
		err = db.Where("id = ?", id).First(&group).Error
		g := group.ToGroup()
		groups = append(groups, &g)
	}
	return groups, err
}

func DeleteGroup(id string) (bool, error) {
	var group model.GroupModel
	var err error
	var ok bool = false

	findGroupErr := db.Where("id = ?", id).First(&group).Error

	if findGroupErr != nil {
		err = errors.New("group not found")
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

func GroupExists(id string) (bool, error) {
	var groups []model.GroupModel

	err := db.Where("id = ?", id).Find(&groups).Error

	return len(groups) > 0, err
}
