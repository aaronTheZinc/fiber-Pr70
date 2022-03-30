package database

import "github.com/vreel/app/graph/model"

func ClearAllTestUsers() {
	users, _ := GetAllUsernames()

	for _, r := range users {
		db.Where("username = ?", r.Username).Delete(&model.UserModel{})
	}

}
