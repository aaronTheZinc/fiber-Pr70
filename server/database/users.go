package database

import (
	"errors"

	"github.com/vreel/app/graph/model"
)

func CreateUser(newUser model.NewUser, hashedPassword string) (model.User, error) {
	user := model.User{
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		Email:     newUser.Email,
	}
	err := db.Create(&user).Error
	return user, err
}

func GetUser(id string) (model.User, error) {
	var user model.User
	if db_init_err != nil {
		return user, errors.New("Failed")
	}
	err := db.First(&user, "id = ?", id)

	return user, err.Error
}
