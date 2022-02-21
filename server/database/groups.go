package database

import (
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateGroup(newGroup model.NewGroup) (model.Group, error) {
	group := model.Group{
		ID:          utils.GenerateUID(),
		Name:        newGroup.Name,
		Location:    newGroup.Location,
		MeetTimes:   newGroup.MeetTimes,
		Private:     newGroup.Private,
		ParentGroup: newGroup.ParentGroup,
	}
	err := db.Create(&group)
	return group, err.Error
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
		var group model.Group
		err = db.Where("id = ?", id).First(&group).Error
		groups = append(groups, &group)
	}
	return groups, err
}
