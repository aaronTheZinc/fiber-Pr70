package analytics

import (
	"github.com/vreel/app/database"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
)

func GetServerAnalytics() (model.ServerAnalytics, error) {
	var err error
	var usernames []*string
	var userCount int

	users, getErr := database.GetAllUsernames()

	if getErr != nil {
		err = e.FAILED_GET_USERNAME
	} else {
		for _, u := range users {
			var username = u.Username
			usernames = append(usernames, &username)
		}
		userCount = len(usernames)
	}
	return model.ServerAnalytics{
		UserCount: userCount,
		Usernames: usernames,
	}, err
}
