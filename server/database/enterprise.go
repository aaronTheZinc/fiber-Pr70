package database

import (
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateEnterprise(owner string, e model.NewEnterprise) (model.Enterprise, error) {
	enterprise := e.ToModel()
	enterprise.ID = utils.GenerateId()
	enterprise.Owner = owner
	err := db.Create(&enterprise).Error

	return enterprise.ToEnterprise([]*model.User{}), err
}

func AddEmployeeToEnterprise() {

}

func RemoveEmployeeFromEnterprise() {

}

func GetAllEnterprises() ([]model.Enterprise, error) {
	var enterprises []model.EnterpriseModel
	var r []model.Enterprise
	err := db.Find(&enterprises)

	for _, v := range enterprises {
		o := v
		r = append(r, o.ToEnterprise([]*model.User{}))
	}

	return r, err.Error
}
