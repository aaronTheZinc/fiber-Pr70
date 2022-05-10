package auth

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/vreel/app/database"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func AuthorizeAddGroupToUser(newGroup model.NewGroup) (model.Group, error) {
	var group model.Group
	var err error
	claims, isAuth, parseErr := ParseToken(newGroup.Token)

	userId := claims.ID
	if !isAuth && parseErr == nil {
		err = e.UNAUTHORIZED_ERROR
	} else {
		// create group
		g, groupCreationErr := database.CreateGroup(userId, newGroup)
		if groupCreationErr != nil {
			err = errors.New("failed to create group")
		} else {
			group = g
			fmt.Printf("user is %s and group is is %s \n", userId, g.ID)
			_, addGroupErr := database.UserAddGroup(userId, g.ID)

			if addGroupErr != nil {
				err = addGroupErr
			}

		}
	}
	return group, err

}
func AuthorizeDeleteGroup(token, groupId string) (model.MutationResponse, error) {
	var err error
	var status bool = false
	_, isAuth, parseErr := ParseToken(token)
	fmt.Println(isAuth, parseErr)
	if isAuth {
		if parseErr != nil {
			err = e.INVALID_TOKEN
		} else {
			ok, deletionErr := database.DeleteGroup(groupId)
			status = ok
			err = deletionErr
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return model.MutationResponse{
		Message:   "successfully removed group ",
		Succeeded: status,
	}, err
}

func AuthorizeAddUserToGroup(token, groupId, member string) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)

	userId := claims.ID

	if isAuth {
		if parseErr != nil {
			err = e.INVALID_TOKEN
		} else {
			author, gErr := database.GroupAuthor(groupId)
			if gErr != nil {
				err = gErr
			}
			if author == userId {
				_, setErr := database.GroupAddMember(groupId, member)
				if setErr != nil {
					err = setErr
				} else {
					r = model.MutationResponse{
						Succeeded: true,
						Message:   "user: " + member + "was added to group: " + groupId,
					}
				}
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return r, err
}

func AuthorizeRemoveUserFromGroup(token, groupId, member string) (model.MutationResponse, error) {
	var r model.MutationResponse
	var err error
	claims, isAuth, parseErr := ParseToken(token)

	userId := claims.ID

	if isAuth && parseErr == nil {
		author, gErr := database.GroupAuthor(groupId)
		if gErr != nil {
			err = gErr
		}
		if author == userId {
			_, setErr := database.GroupRemoveMember(groupId, member)
			if setErr != nil {
				err = setErr
			} else {
				r = model.MutationResponse{
					Succeeded: true,
					Message:   "user: " + member + "was removed to group: " + groupId,
				}
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return r, err
}
func AuthorizeGetGroup(token, groupId string) (model.Group, error) {
	var group model.Group
	var err error

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	g, getErr := database.GetGroup(groupId)

	if getErr != nil {
		err = e.GROUP_NOT_FOUND
	} else if g.Private {
		if isAuth && parseErr == nil {
			if g.Author == userId || utils.ItemExistsInStringSlice(userId, g.Members) {
				group = g
			} else {
				err = e.UNAUTHORIZED_ERROR
			}
		} else {
			err = e.UNAUTHORIZED_ERROR
		}
	} else {
		group = g
	}
	return group, err
}

func CreateEvent(token string, newEvent model.NewEvent) (model.Event, error) {
	var err error
	var event model.Event

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		ev, creationErr := database.CreateEvent(userId, newEvent)
		if creationErr != nil {
			err = e.FAILED_EVENT_CREATE
		} else {
			event = ev
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return event, err
}

func AuthorizeCreateSlide(token string) (model.Slide, error) {
	var err error
	var slide model.Slide

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		if s, creationErr := database.CreateSlide(userId); creationErr != nil {
			err = creationErr
		} else {
			slide = s
			if updateErr := database.VreelAddSlide(s.ID, userId); updateErr != nil {
				err = updateErr
			}

		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return slide, err
}

func AuthorizeUpdateUserFields(token string, fields []*model.VreelFields) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.UpdateUserFields(userId, fields)
		if updateErr != nil {
			err = updateErr
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return r, err
}

func AuthorizeRemoveSlide(token, slideId string) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		if s, getErr := database.GetSlide(slideId); getErr != nil {
			err = e.SLIDE_NOT_FOUND
		} else {
			if s.Author == userId {
				deletionErr := database.DeleteSlide(slideId)
				if deletionErr != nil {
					err = deletionErr
				} else {
					r := database.VreelRemoveSlide(userId, slideId)
					if r != nil {
						err = r
					}
				}
			} else {
				err = e.UNAUTHORIZED_ERROR
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return r, err
}

func AuthorizeAddEmployeeToEnterprise(token string, newUser model.NewUser) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		if user, get_err := database.GetUser(userId); get_err != nil {
			err = e.USER_NOT_FOUND
		} else {
			if user.AccountType == "enterprise" {
				newUser.AccountType = "employee"
				newUser.Username = utils.GenerateId()
				u, creationErr := CreateNewUser(newUser)
				if creationErr != nil {
					err = creationErr
				} else {
					if enterprise, fetchErr := database.GetEnterpriseByOwner(userId); fetchErr != nil {
						err = e.ENTERPRISE_NOT_FOUND
					} else {

						updateErr := database.AddEmployeeToEnterprise(*enterprise.ID, u.ID)
						if updateErr != nil {
							err = e.ENTERPRISE_FAILED_ADD_EMPLOYEE
						} else {
							r = model.MutationResponse{
								Succeeded: true,
								Message:   "added user to enterprise: " + *enterprise.ID,
							}
						}
					}
				}
			} else {
				err = e.INVALID_ACCOUNT_TYPE
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return r, err
}
func AuthorizeRemoveEmployeeToEnterpirse() {

}

func AuthorizeEditSlide(token, slideId, data string) (model.Slide, error) {
	var err error
	var slide model.Slide

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		if s, fetchErr := database.GetSlide(slideId); fetchErr != nil {
			err = fetchErr
		} else {
			if s.Author == userId {
				sl := model.Slide{}
				sl.ID = slideId
				sl.Author = userId

				if jErr := json.Unmarshal([]byte(data), &sl); jErr != nil {
					err = e.FAILED_TO_PARSE_SLIDE
				} else {
					v, slideUpdateErr := database.UpdateSlide(slideId, sl.ToDatabaseModel())
					if slideUpdateErr != nil {
						err = e.FAILED_UPDATE_SLIDE
					}
					slide = v
				}
			} else {
				err = e.UNAUTHORIZED_ERROR
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return slide, err
}

// add and log like
func AuthorizeSlideLike(slideId string, token string) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		if exists, slideFetchErr := database.SlideExists(slideId); exists && slideFetchErr == nil {
			if hasBeenLiked, _ := database.HasBeenLikedByAuthor(userId, slideId); !hasBeenLiked {
				if f, likeCreationErr := database.CreateLike(userId, slideId); likeCreationErr != nil {
					err = likeCreationErr
				} else {
					r.Message = "Liked Fragment Id: " + f.ID
				}

			} else {
				r.Message = "Has Been Liked By Author."
			}
		} else {
			err = e.SLIDE_NOT_FOUND
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return r, err
}

func AuthorizeSlideRemoveLike(slideId, token string) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)

	userId := claims.ID
	if isAuth && parseErr == nil {
		if removeLikeErr := database.RemoveLike(userId, slideId); removeLikeErr != nil {
			err = e.FAILED_REMOVE_LIKE
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return r, err
}

// func AuthorizeFollowVreel(vreelId, token string) (model.MutationResponse, error) {
// 	var err error
// 	var r model.MutationResponse

// 	claims, isAuth, parseErr := ParseToken(token)
// 	userId := claims.ID

// 	if isAuth && parseErr == nil {

// 	} else {
// 		err = e.UNAUTHORIZED_ERROR
// 	}
// 	return r, err
// }

// func AuthorizeUnfollowVreel(vreelId, token string) (model.MutationResponse, error) {
// 	var err error
// 	var r model.MutationResponse

// 	claims, isAuth, parseErr := ParseToken(token)
// 	userId := claims.ID

// 	if isAuth && parseErr == nil {

// 	} else {
// 		err = e.UNAUTHORIZED_ERROR
// 	}
// 	return r, err
// }
