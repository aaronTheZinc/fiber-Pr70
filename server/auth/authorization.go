package auth

import (
	"errors"
	"fmt"

	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
)

func AuthorizeAddGroupToUser(newGroup model.NewGroup) (model.Group, error) {
	var group model.Group
	var err error
	claims, isAuth, parseErr := ParseToken(newGroup.Token)

	userId := claims.ID
	if !isAuth && parseErr == nil {
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
			err = errors.New("invalid token")
		} else {
			ok, deletionErr := database.DeleteGroup(groupId)
			if deletionErr != nil {
				fmt.Println("error does exist!")
				fmt.Println(deletionErr.Error())
			}
			status = ok
			err = deletionErr
		}
	} else {
		err = errors.New("user not authorized")
	}
	return model.MutationResponse{
		Message:   "successfully removed group ",
		Succeeded: status,
	}, err
}
