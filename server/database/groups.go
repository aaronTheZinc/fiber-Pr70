package database

import (
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateGroup(author string, newGroup model.NewGroup) (model.Group, error) {
	group := newGroup.ToDatabaseModel()
	group.ID = utils.GenerateUID()
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

func GroupExists(id string) (bool, error) {
	var groups []model.GroupModel

	err := db.Where("id = ?", id).Find(&groups).Error

	return len(groups) > 0, err
}
