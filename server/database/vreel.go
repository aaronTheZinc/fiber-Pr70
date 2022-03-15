package database

import (
	"errors"

	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

//creates  when new account is created
func CreateNewVreel(author string) error {
	var err error
	buttonUri := "https://vreel.page"
	e, gErr := utils.GetDefaultElementsString()
	vreel := model.VreelModel{
		ID:        utils.GenerateUID(),
		Author:    author,
		PageTitle: "Your Vreel",
		ButtonURI: &buttonUri,
		Elements:  e,
	}
	if gErr != nil {
		err = errors.New("failed to create vreel")
	}
	cErr := db.Create(&vreel).Error

	if cErr != nil {
		err = cErr
	}

	return err

}

func GetVreel() {

}

func UpdateVreelElements(id, elements string) error {
	var u model.UserModel
	err := db.Where("id = ? ", id).First(&u)

	return err.Error
}

func GetAllVreels() ([]model.VreelModel, error) {
	var v []model.VreelModel
	var err error
	return v, err
}

//create a function called CreateVreel that accepts a title as a string and saves to gorm database
