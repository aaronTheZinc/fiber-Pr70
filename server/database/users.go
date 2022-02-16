package database

import (
	"github.com/vreel/app/graph/model"
)

//Create User
func CreateUser(newUser model.NewUser, id string, hashedPassword string) (model.User, error) {
	user := model.User{
		ID:        id,
		Username:  newUser.Username,
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		Email:     newUser.Email,
		Password:  hashedPassword,
	}
	err := db.Create(&user).Error
	return user, err
}

//Retrieve User by ID
func GetUser(id string) (model.User, error) {
	var user model.User
	if db_init_err != nil {
		return user, db_init_err
	}
	err := db.First(&user, "id = ?", id)

	return user, err.Error
}

//Retrieve User by Username
func GetUserByUsername(username string) (model.User, error) {
	var user model.User
	if db_init_err != nil {
		return user, db_init_err
	} else {
		err := db.Where("username = ?", username).First(&user)
		return user, err.Error
	}
}

//Check If Username Has Been Taken
func UsernameIsTaken(username string) (bool, error) {
	var doesExist bool
	var user model.User

	if db_init_err != nil {
		return doesExist, db_init_err
	} else {
		err := db.Where("username = ?", username).First(&user)
		if err.Error != nil {
			doesExist = true
		} else {
			doesExist = false
		}

	}
	return doesExist, nil
}

//Check if User Email is In Database
func UserIsRegistered(email string) (bool, error) {
	var results []model.User

	err := db.Where("email =?", email).Find(&results)

	return len(results) > 0, err.Error
}

func GetUserByEmail(email string) (model.User, error) {
	var user model.User
	err := db.Where("email =?", email).First(&user)
	return user, err.Error
}
