package auth

import (
	"errors"
	"fmt"

	"github.com/vreel/app/database"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
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
