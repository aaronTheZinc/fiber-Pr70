package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/vreel/app/cache"
	"github.com/vreel/app/database"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
	"golang.org/x/crypto/bcrypt"
)

type PasswordResetCacheModel struct {
	Token     string `json:"token"`
	Requester string `json:"requester"`
}

func CreateNewEnterprise(ent model.NewEnterprise) (model.Enterprise, error) {
	var enterprise model.Enterprise
	var err error

	if u, creationErr := CreateNewUser(model.NewUser{
		Username:    ent.Name,
		Email:       ent.Email,
		Password:    &ent.Password,
		AccountType: "enterprise",
	}); creationErr != nil {
		err = creationErr
	} else {
		log.Println("successfully created!")
		if r, creationErr := database.CreateEnterprise(u.ID, ent); creationErr != nil {
			err = e.FAILED_ENTERPRISE_CREATE
		} else {
			if createVreelErr := database.CreateNewVreel(*r.ID); createVreelErr != nil {
				err = e.FAILED_CREATE_VREEL
			} else {
				enterprise = r
			}
		}
	}

	return enterprise, err
}

// Create User & Validate Existence Of Conflicting Accounts
func CreateNewUser(newUser model.NewUser) (model.User, error) {
	var user model.User
	var err error
	isRegisted, registrationCheckError := database.UserIsRegistered(newUser.Email)
	usernameIsRegistered, usernameCheckError := database.UsernameIsTaken(newUser.Username)

	if registrationCheckError != nil {
		err = registrationCheckError
	}

	if isRegisted {
		err = e.EMAIL_IN_USE
	}

	if usernameIsRegistered {
		err = e.USERNAME_IN_USE
	}

	if usernameCheckError != nil {
		err = usernameCheckError
	}
	if !isRegisted && !usernameIsRegistered {
		hashedPw, hashErr := HashPassword(*newUser.Password)
		if hashErr != nil {
			return model.User{}, hashErr
		}
		u, oerr := database.CreateUser(newUser, utils.GenerateId(), hashedPw)
		s, _ := database.CreateSlide(u.ID, "")
		cErr := database.CreateNewVreel(u.ID)
		if cErr == nil {
			database.VreelAddSlide(s.ID, u.ID)
		}
		user = u
		if oerr != nil {
			err = e.FAILED_CREATE_USER
		}
		if cErr != nil {
			err = e.FAILED_CREATE_VREEL
		}
	} else {
	}

	return user, err

}

func Login(email string, password string) (model.LocalSession, error) {
	var localSession model.LocalSession
	user, err := database.GetUserModelByEmail(email)

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
			tkn, _ := CreateToken(user.ID, user.AccountType)
			localSession = model.LocalSession{
				Token: tkn,
			}
			return localSession, nil
		}
	}
}

//Reset Password
func CreateResetPasswordRequestIntent(email string) (model.ResetPasswordResponse, error) {
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
					Message:   "failed to update password.",
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

func CreatePhoneVerificationIntent() {

}

func ResolvePhoneVerificationInput() {

}
func GetUserByToken(token string) (model.User, error) {
	var err error
	var user model.User
	if claims, _, pasrseErr := ParseToken(token); pasrseErr != nil {
		err = e.UNAUTHORIZED_ERROR
	} else {
		if err == nil {
			if u, fetchErr := database.GetUser(claims.ID); fetchErr != nil {
				err = e.USER_NOT_FOUND
			} else {
				user = u
			}
		}
	}

	return user, err
}

func GetEnterpriseByToken(token string) (model.Enterprise, error) {
	var enterprise model.Enterprise
	var err error
	if claims, _, pasrseErr := ParseToken(token); pasrseErr != nil {
		err = e.UNAUTHORIZED_ERROR
	} else {
		if err == nil {
			if ent, fetchErr := database.GetEnterpiseByOwner(claims.ID); fetchErr != nil {
				err = e.ENTERPRISE_NOT_FOUND
			} else {
				enterprise = ent
			}
		}
	}

	return enterprise, err

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

func RemoveUser(id string) (model.MutationResponse, error) {
	if err := database.RemoveUser(id); err != nil {
		return model.MutationResponse{false, "failed"}, err
	} else {
		return model.MutationResponse{
			Succeeded: true,
			Message:   "deleted user -> " + id,
		}, err
	}
}
