package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/vreel/app/cache"
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
	"golang.org/x/crypto/bcrypt"
)

type PasswordResetCacheModel struct {
	Token     string `json:"token"`
	Requester string `json:"requester`
}

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
		_, hashErr := CompareHashPassword(password, user.Password)
		if hashErr != nil {
			err := IncrementLoginAttempts(email)
			l, _ := LoginAttemptsLeft(email)
			fmt.Println("Remaining Attempts:  " + strconv.Itoa(l))
			fmt.Println(err.Error())
			return localSession, errors.New("incorrect password")
		} else {
			tkn := GenerateToken()
			localSession.Token = tkn
			return localSession, nil
		}
	}
}

//Reset Password
func CreateResetPasswordRequest(email string) (model.ResetPasswordResponse, error) {
	var response model.ResetPasswordResponse
	var err error
	emailExists, _ := database.UserIsRegistered(email)
	if emailExists {
		ttl := time.Hour * 24
		r := PasswordResetCacheModel{
			Token:     utils.GenerateId(),
			Requester: email,
		}
		val, marshal_err := json.Marshal(r)
		m := string(val)
		if marshal_err != nil {
			err = marshal_err
			return response, err
		} else {
			set_err := cache.SetString("rp-"+r.Token, m, ttl)
			if set_err != nil {
				err = set_err
				return response, err
			} else {
				response = model.ResetPasswordResponse{
					ResetToken:  r.Token,
					Message:     "Successfully Created Reset Password",
					EmailExists: true,
				}
				return response, err
			}
		}
	} else {
		response := model.ResetPasswordResponse{
			EmailExists: emailExists,
			Message:     "email not in use",
		}
		return response, nil
	}

}

func UpdatePassword(token string, password string) (model.ResolvedPasswordReset, error) {
	var err error
	var resolvedPasswordReset model.ResolvedPasswordReset

	var passwordResetObj PasswordResetCacheModel

	val, get_err := cache.GetString("rp-" + token)
	unmarshalErr := json.Unmarshal([]byte(val), &passwordResetObj)
	if get_err != nil || unmarshalErr != nil {
		err = get_err
		return resolvedPasswordReset, err
	} else {
		hp, hashErr := HashPassword(password)
		if hashErr != nil {
			err = hashErr
			resolvedPasswordReset = model.ResolvedPasswordReset{
				Succeeded: false,
				Message:   "failed to hash new password.",
			}
			return resolvedPasswordReset, err
		} else {
			_, set_err := database.UpdatePassword(passwordResetObj.Requester, hp)
			if set_err != nil {
				err = set_err
				resolvedPasswordReset = model.ResolvedPasswordReset{
					Succeeded: false,
					Message:   "failed to update passwor.",
				}
				return resolvedPasswordReset, err
			}
			resolvedPasswordReset = model.ResolvedPasswordReset{
				Succeeded: true,
				Message:   "password reset.",
			}
			return resolvedPasswordReset, err
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
