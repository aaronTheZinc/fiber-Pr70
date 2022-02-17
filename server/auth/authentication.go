package auth

import (
	"errors"
	"fmt"

	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
	"golang.org/x/crypto/bcrypt"
)

// Create User & Validate Existence Of Conflicting Accounts
func CreateNewUser(newUser model.NewUser) (model.User, error) {
	var user model.User
	isRegisted, registrationCheckError := database.UserIsRegistered(newUser.Email)
	if registrationCheckError != nil {
		return user, registrationCheckError
	}
	if !isRegisted {
		hashedPw, hashErr := HashPassword(newUser.Password)
		if hashErr != nil {
			return model.User{}, hashErr
		}
		user, err := database.CreateUser(newUser, utils.GenerateUID(), hashedPw)
		return user, err
	} else {
		return user, errors.New("email in use")
	}

}

func Login(email string, password string) (model.LocalSession, error) {
	var localSession model.LocalSession
	user, err := database.GetUserByEmail(email)

	if err != nil {
		return localSession, err
	} else {
		fmt.Println(user.Password)
		doesMatch, hashErr := CompareHashPassword(password, user.Password)
		if hashErr != nil {
			return localSession, hashErr
		} else {
			if doesMatch {
				tkn := GenerateToken()
				localSession.Token = tkn
				return localSession, nil
			} else {
				return localSession, errors.New("incorrect password")
			}
		}
	}

}

//Hash Passowrd To Be Stored In Database
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

//Compare Hashed and Raw Password To Determine Succesfull login
func CompareHashPassword(rawPassword string, hashedPassword string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(rawPassword))
	if err != nil {
		return false, err
	} else {
		return true, nil
	}
}
