package auth

import (
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
	"golang.org/x/crypto/bcrypt"
)

func CreateNewUser(user model.NewUser) (model.User, error) {

	hashedPw, hashErr := HashPassword(user.Password)
	if hashErr != nil {
		return model.User{}, hashErr
	}
	return database.CreateUser(user, hashedPw)
}
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
