package database

import (
	"errors"
	"fmt"
	"log"
	"sync"

	"github.com/lib/pq"
	"github.com/vreel/app/api/client"
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
	wg := sync.WaitGroup{}
	var err error
	var user model.UserModel
	var r model.User

	db.First(&user, "id = ?", id)
	groups, _ := GetGroups(user.Groups)
	r = user.ToUser()
	r.Groups = groups
	wg.Add(1)
	go func() {
		defer wg.Done()
		if v, e := GetVreel(id); e != nil {
			err = e
		} else {
			r.Vreel = &v
		}
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		files, _ := client.GetUsersFiles(id)
		r.Files = &files
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		news, _ := CreateNewsFeed(id, user.Following)
		r.News = news
	}()
	wg.Wait()
	//add query for fetching news feed

	return r, err
}

//Retrieve User by Username
func GetUserByUsername(username string) (model.User, error) {
	wg := sync.WaitGroup{}
	var err error
	var user model.UserModel
	var r model.User

	db.First(&user, "username = ?", username)
	groups, _ := GetGroups(user.Groups)
	r = user.ToUser()
	r.Groups = groups
	wg.Add(1)
	go func() {
		defer wg.Done()
		if v, e := GetVreel(user.ID); e != nil {
			err = e
		} else {
			r.Vreel = &v
		}
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		files, _ := client.GetUsersFiles(user.ID)
		r.Files = &files
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		news, _ := CreateNewsFeed(user.ID, user.Following)
		r.News = news
	}()

	wg.Wait()
	return r, err
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
		return user, err
	}
	update_err := db.Model(&user).Update("password", password)

	if update_err != nil {
		err = get_err
		return user, err
	}

	return user, nil

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
func GetUserByEmail(email string) (model.User, error) {
	wg := sync.WaitGroup{}
	var err error
	var user model.UserModel
	var r model.User
	db.First(&user, "email = ?", email)
	groups, _ := GetGroups(user.Groups)
	r = user.ToUser()
	r.Groups = groups
	wg.Add(1)
	go func() {
		defer wg.Done()
		if v, e := GetVreel(user.ID); e != nil {
			err = e
		} else {
			r.Vreel = &v
		}
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		files, _ := client.GetUsersFiles(user.ID)
		r.Files = &files
	}()
	wg.Add(1)
	go func() {
		defer wg.Done()
		news, _ := CreateNewsFeed(user.ID, user.Following)
		r.News = news
	}()
	wg.Wait()
	return r, err
}

func GetAllUsernames() ([]model.UserModel, error) {
	var users []model.UserModel
	err := db.Select("username").Find(&users)

	return users, err.Error
}

func UpdateUserFields(id string, fields []*model.VreelFields) error {
	userFields := []string{"first_name", "last_name", "email", "prefix",
		"suffix", "work_phone", "cell_phone", "home_phone", "job_title", "profile_picture",
		"company_name", "business_address", "home_address",
		"landing_page", "middle_initial"}
	var wg sync.WaitGroup
	var err error
	// fmt.Printf("input: %s", fields)
	for _, f := range fields {
		var o model.VreelFields = *f
		wg.Add(1)
		go func() {
			defer wg.Done()
			if utils.ItemExistsInStringSlice(o.Field, userFields) {
				fmt.Printf("field: %s, value: %s", o.Field, o.Value)
				err := db.Model(&model.UserModel{}).Where("id = ?", id).Update(o.Field, o.Value).Error
				if err != nil {
					log.Printf(err.Error())
					err = e.VreelFieldError(o.Field)
					return
				}
			} else {
				err = e.VreelFieldError(o.Field)
			}
		}()
	}

	wg.Wait()

	return err
}

func AddFollowingToUser(userId, vreelId string) error {
	var user model.UserModel

	var err error
	if getErr := db.Where("id = ?", userId).Select("following").First(&user).Error; getErr == nil {
		var following pq.StringArray

		following = user.Following
		if !utils.ItemExistsInStringSlice(vreelId, following) {
			following = append(following, vreelId)
			updateErr := db.Model(model.UserModel{}).Where("id = ?", userId).Update("following", following).Error
			log.Println(following)
			if updateErr != nil {
				err = errors.New("failed to add follow fragment")
			}
		}
	}

	return err
}

func RemoveUser(id string) error {
	return db.Where("id = ?", id).Delete(model.UserModel{}).Error
}
