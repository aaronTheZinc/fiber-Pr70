package database

import "github.com/vreel/app/graph/model"

func CreateVreel() {

}

func GetVreel() {

}

func UpdateVreelField(id, field, value string) error {
	var u model.UserModel
	err := db.Where("id = ? ", id).First(&u)

	return err.Error
}

//create a function called CreateVreel that accepts a title as a string and saves to gorm database
