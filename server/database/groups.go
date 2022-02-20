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
