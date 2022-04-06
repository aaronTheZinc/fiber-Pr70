package database

import "github.com/vreel/app/graph/model"

func CreateEnterprise(owner string, e model.NewEnterprise) (model.Enterprise, error) {
	enterprise := e.ToModel()
	enterprise.Owner = owner
	err := db.Create(&enterprise).Error

	return enterprise.ToEnterprise([]*model.User{}), err
}

func AddEmployeeToEnterprise() {

}

func RemoveEmployeeFromEnterprise() {

}
