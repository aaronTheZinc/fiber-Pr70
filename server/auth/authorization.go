package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/vreel/app/api/client"
	"github.com/vreel/app/database"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func AuthorizeDeleteEnterprise(token, id string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully removed enterprise", database.DeleteEnterprise(id))
	})

	return resp, err
}

func AuthorizeEditSocialsLink(token, platform string, social model.SocialsInput, vreelId *string) (model.MutationResponse, error) {

	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID
	if isAuth && parseErr == nil {
		editErr := database.EditSocialLinks(userId, platform, social.ToLink())
		if editErr != nil {
			err = editErr
		} else {
			resp = model.MutationResponse{
				Message:   "successfully updated  socials",
				Succeeded: true,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeEditSimpleLink(token, linkId string, link model.SimpleLinkInput, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID
	if isAuth && parseErr == nil {
		editErr := database.EditSimpleLink(userId, linkId, link.ToLink(linkId))
		if editErr != nil {
			err = editErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully edited simple link",
			}
		}

	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

// func AuthorizeRemoveSocialsLink(token, platform string, vreelId *string) (model.MutationResponse, error) {
// 	var err error
// 	var resp model.MutationResponse
// 	claims, isAuth, parseErr := ParseToken(token)
// 	userId := claims.ID

// 	if isAuth && parseErr == nil {
// 		updateErr := database.RemoveSocialLink(userId, platform)

// 		if updateErr != nil {
// 			err = updateErr
// 		} else {
// 			resp = model.MutationResponse{
// 				Succeeded: true,
// 				Message:   "successfully removed platdform",
// 			}
// 		}
// 	} else {
// 		err = e.UNAUTHORIZED_ERROR
// 	}

// 	return resp, err
// }

func AuthorizeAddPage(token string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.CreatePage(userId)

		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully created page.",
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeUpdateElementVisibility(token, element string, state bool) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.SetElementIsHidden(userId, element, state)

		if updateErr != nil {
			err = updateErr
		}
		resp = model.MutationResponse{
			Succeeded: true,
			Message:   "Successfully changed element state",
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeUpdateSlideLocation(token, slideId string, location int) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.UpdateSlideLocation(slideId, userId, location)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully updated slide location: " + slideId,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return resp, err
}

func AuthorizeEditVreelLogo(token, uri string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.EditVreelLogo(userId, uri)

		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully edited logo uri",
			}
		}
	} else {

	}

	return resp, err
}

// func AuthorizeEditElementPosition(token, element string, position int) (model.MutationResponse, error) {
// 	var err error
// 	var resp model.MutationResponse
// 	claims, isAuth, parseErr := ParseToken(token)
// 	userId := claims.ID

// 	if isAuth && parseErr == nil {
// 		updateErr := database.EditElementPosition(userId, element, position)

// 		if updateErr != nil {
// 			err = updateErr
// 		} else {
// 			resp = model.MutationResponse{
// 				Succeeded: true,
// 				Message:   "set " + element + " postion to: " + strconv.Itoa(position),
// 			}
// 		}
// 	} else {
// 		err = e.UNAUTHORIZED_ERROR
// 	}

// 	return resp, err
// }

func AuthorizeResetElements(token string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.ResetUserEmployee(userId)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "reset elements for: " + userId,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeAddMusicLinkToVreel(token string, input model.MusicInput) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.AddMusicLink(userId, input)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully added music link: " + input.Platform,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeRemoveMusicLinkFromVreel(token, linkId string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.RemoveMusicLink(userId, linkId)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully removed link: " + linkId,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeAddContributionLinkToVreel(token string, input model.ContributionsInput) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.AddContributionLink(userId, input)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully created contribution: " + input.Platform,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeRemoveContributionLinkFromVreel(token, contributionLinkId string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		updateErr := database.RemoveContributionLink(userId, contributionLinkId)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully removed contribution: " + contributionLinkId,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeRemoveVideoFromVreel(token, videoId string, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		vId := userId
		if vreelId != nil {
			vId = *vreelId
		}
		updateErr := database.RemoveVideoFromVreel(vId, videoId)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully removed video: " + videoId,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return resp, err
}

func AuthorizeAddVideoToVreel(token string, video model.Video, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID
	if isAuth && parseErr == nil {
		vId := userId
		if vreelId != nil {
			vId = *vreelId
		}
		updateErr := database.AddVideoToVreel(vId, video)
		if updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully added video: " + video.VideoHeader,
			}
		}

	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return resp, err
}

func AuthorizeAddImageToGallery(token string, input model.AddGalleryImageInput, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		vId := userId
		if vreelId != nil {
			vId = *vreelId
		}
		if updateErr := database.AddImageToVreelGallery(vId, input); updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully added image: " + *input.ImageHeader + " to gallery.",
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}
func AuthorizeRemoveImageFromGallery(token, imageId string, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		vId := userId
		if vreelId != nil {
			vId = *vreelId
		}
		if updateErr := database.RemoveImageFromGallery(vId, imageId); updateErr != nil {
			err = updateErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "successfully removed image: " + imageId + " to gallery.",
			}
		}

	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeAddSocialsLink(token string, input model.SocialsInput) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		editErr := database.AddSocialsLink(userId, input)

		if err != nil {
			err = editErr
		} else {
			resp.Message = "added " + *input.Platform + " to " + userId
			resp.Succeeded = true
		}

	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeRemoveSimpleLinkFromVreel(token, linkId string, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	// claims, isAuth, parseErr := ParseToken(token)
	// userId := claims.ID

	// if isAuth && parseErr == nil {
	// 	vId := userId
	// 	if vreelId != nil {
	// 		vId = *vreelId
	// 	}
	// 	updateErr := database.RemoveSimpleLink(vId, linkId)

	// 	if updateErr != nil {
	// 		err = updateErr
	// 	} else {
	// 		resp = model.MutationResponse{
	// 			Message:   "successfully removed simple link: " + linkId,
	// 			Succeeded: true,
	// 		}
	// 	}
	// } else {
	// 	err = e.UNAUTHORIZED_ERROR
	// }
	return resp, err
}

func AuthorizeAddSimpleLinkToVreel(token string, link model.SimpleLink, vreelId *string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		vId := userId
		if vreelId != nil {
			vId = *vreelId
		}
		linkAddErr := database.AddSimpleLinkToVreel(vId, link)
		if linkAddErr != nil {
			err = errors.New("fialed to add link")
		}
	} else {
		return resp, e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

func AuthorizeAddSuperLinkToVreel(token string, link model.SuperLink) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		linkAddErr := database.AddSuperLinkToVreel(userId, link)
		if linkAddErr != nil {
			err = errors.New("fialed to add link")
		}
	} else {
		return resp, e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

//insecure
func AuthorizeEditFileName(token, fileId, newName string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID
	if isAuth && parseErr == nil {
		err = client.EditFileName(userId, fileId, newName)
		if err == nil {
			resp = model.MutationResponse{
				Message:   "[edited]: " + fileId,
				Succeeded: true,
			}
		}
	}
	return resp, err
}

//may be insecure
func AuthorizeDeleteFile(token, fileId string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID
	if isAuth && parseErr == nil {
		deleteErr := client.DeleteFile(userId, fileId)
		if deleteErr != nil {
			err = deleteErr
		}
		resp = model.MutationResponse{Message: "succeeded", Succeeded: true}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}

	return resp, err
}

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

func AuthorizeAddEmployeeToEnterprise(token string, newUser model.NewUser) (model.User, error) {
	var err error
	var employee model.User

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
							employee = u
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
	return employee, err
}

func AuthorizeUpdateEmployeeFields(token, employeeId string, fields []*model.VreelFields) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		if ent, enterpriseGetErr := database.GetEnterpiseByOwner(userId); enterpriseGetErr == nil {
			if includesEmployee, _ := database.EnterpriseOwnsEmployee(*ent.ID, employeeId); includesEmployee {
				updateErr := database.UpdateUserFields(employeeId, fields)

				if updateErr != nil {
					err = updateErr
					fmt.Println("failed to update the content thats all!")
				}
			} else {
				fmt.Println("doest include employee!")
				err = e.UNAUTHORIZED_ERROR
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
					log.Println("slide update error ->", jErr.Error())
				} else {
					fmt.Println("edited slide object ->", s)
					s := sl.ToDatabaseModel()
					fmt.Println("[Parsed Logo Visibility]", s.Active)
					v, slideUpdateErr := database.UpdateSlide(slideId, s)
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
					r.Succeeded = true
				}

			} else {
				r.Message = "Has Been Liked By Author."
				r.Succeeded = false
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

func AuthorizeFollowVreel(vreelId, token string) (model.MutationResponse, error) {
	var err error
	var r model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID
	log.Println("-->", userId)
	if isAuth && parseErr == nil {
		if isFollow, isFollowErr := database.HasBeenFollowedByAuthor(userId, vreelId); !isFollow && isFollowErr == nil {
			_, likeCreationErr := database.CreateFollow(userId, vreelId)
			database.AddFollowingToUser(userId, vreelId)
			if likeCreationErr != nil {
				err = likeCreationErr
			} else {
				r = model.MutationResponse{
					Succeeded: true,
					Message:   "follow succeeded on: " + vreelId,
				}
			}

		} else if isFollowErr != nil {
			err = isFollowErr
		} else {
			r = model.MutationResponse{
				Message:   "Already Followed By Author",
				Succeeded: false,
			}
		}

	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return r, err
}

func AuthorizeUnfollowVreel(token, target string) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse

	claims, isAuth, parseErr := ParseToken(token)
	userId := claims.ID

	if isAuth && parseErr == nil {
		removeErr := database.RemoveFollow(userId, target)
		if removeErr != nil {
			err = removeErr
		} else {
			resp = model.MutationResponse{
				Succeeded: true,
				Message:   "unfollowed vreel: " + target,
			}
		}
	} else {
		err = e.UNAUTHORIZED_ERROR
	}
	return resp, err
}
