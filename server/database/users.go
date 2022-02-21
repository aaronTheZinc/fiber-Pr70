package database

import (
	"github.com/vreel/app/graph/model"
)

//Create User
func CreateUser(newUser model.NewUser, id string, hashedPassword string) (model.User, error) {
	userModel := newUser.ToDatabaseModel()
	userModel.ID = id
	userModel.Password = hashedPassword
	err := db.Create(&userModel).Error
	return userModel.ToUser(), err
}

//Retrieve User by ID
func GetUser(id string) (model.User, error) {
	var err error
	var user model.UserModel
	var r model.User
	if db_init_err != nil {
		return r, db_init_err
	}
	db.First(&user, "id = ?", id)
	groups, e := GetGroups(user.Groups)
	r = user.ToUser()
	r.Groups = groups
	err = e
	return r, err
}

//Retrieve User by Username
func GetUserByUsername(username string) (model.User, error) {
	var user model.UserModel
	if db_init_err != nil {
		return user.ToUser(), db_init_err
	} else {
		err := db.Where("username = ?", username).First(&model.UserModel{})
		return user.ToUser(), err.Error
	}
}

//Check If Username Has Been Taken
func UsernameIsTaken(username string) (bool, error) {
	var doesExist bool
	var user model.UserModel

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

//Update Password
func UpdatePassword(email string, password string) (model.User, error) {
	var err error
	user, get_err := GetUserByEmail(email)
	if get_err != nil {
		err = get_err
		return user.ToUser(), err
	}
	update_err := db.Model(&user).Update("password", password)

	if update_err != nil {
		err = get_err
		return user.ToUser(), err
	}

	return user.ToUser(), nil

}

//Check if User Email is In Database
func UserIsRegistered(email string) (bool, error) {
	var results []model.UserModel

	err := db.Where("email = ?", email).Find(&results)

	return len(results) > 0, err.Error
}

func GetUserByEmail(email string) (model.UserModel, error) {
	var user model.UserModel
	err := db.Where("email = ?", email).First(&user)
	return user, err.Error
}
