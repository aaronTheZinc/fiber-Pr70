package database

import (
	"errors"

	"github.com/vreel/app/graph/model"
)

func CreateUser(newUser model.NewUser, id string, hashedPassword string) (model.User, error) {
	user := model.User{
		ID:        id,
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

func UserIsRegistered(email string) (bool, error) {
	var results []model.User

	err := db.Where("email =?", email).Find(&results)

	return len(results) > 0, err.Error
}
