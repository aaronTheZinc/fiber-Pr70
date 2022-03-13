package database

import (
	"errors"

	"github.com/lib/pq"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
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
	groups, _ := GetGroups(user.Groups)
	r = user.ToUser()
	r.Groups = groups

	return r, err
}

//Retrieve User by Username
func GetUserByUsername(username string) (model.User, error) {
	var err error
	var user model.UserModel
	var u model.User
	getErr := db.Where("username = ?", username).First(&user)

	if getErr.Error != nil {
		err = getErr.Error
	} else {
		u = user.ToUser()
	}
	return u, err
}

//Check If Username Has Been Taken
func UsernameIsTaken(username string) (bool, error) {
	var err error
	var doesExist bool
	var users []model.UserModel

	e := db.Where("username = ?", username).Find(&users)

	if e.Error != nil {
		err = e.Error
	}
	doesExist = len(users) > 0

	return doesExist, err
}

//Update Password
func UpdatePassword(email, password string) (model.User, error) {
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
func UserIsRegisteredById(id string) (bool, error) {
	var results []model.UserModel

	err := db.Where("id = ?", id).Find(&results)

	return len(results) > 0, err.Error
}

func UserAddGroup(userId, groupId string) (model.UserModel, error) {
	var err error
	var user model.UserModel
	var groupIds pq.StringArray = []string{}

	userCheckErr := db.Where("id = ?", userId).First(&user).Error
	if userCheckErr != nil {
		err = errors.New("user not found")
	} else {
		groupIds = user.Groups
		groupIds = append(groupIds, groupId)
		updateErr := db.Model(&user).Where("id = ?", userId).Update("groups", groupIds).Error

		if updateErr != nil {
			err = e.GROUP_UPDATE_FAILED
		}

	}

	return user, err
}
func UserDeleteGroup(userId, groupId string) error {
	var err error
	var user model.UserModel
	findErr := db.Where("id = ?", userId).First(&user).Error
	if findErr != nil {
		err = errors.New("user not found")
	} else {
		var groupIds pq.StringArray = utils.RemoveDuplicateStringFromSlice(user.Groups, groupId)
		updateErr := db.Model(&user).Where("id = ?", userId).Update("groups", groupIds).Error
		if updateErr != nil {
			err = e.GROUP_DELETE_FAILED
		}
	}
	return err

}
func GetUserByEmail(email string) (model.UserModel, error) {
	var user model.UserModel
	err := db.Where("email = ?", email).First(&user)
	return user, err.Error
}

func GetAllUsernames() ([]model.UserModel, error) {
	var users []model.UserModel
	err := db.Select("username").Find(&users)

	return users, err.Error
}
