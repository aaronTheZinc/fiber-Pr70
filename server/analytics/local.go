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
	var vreels []*model.Vreel
	var enterprises []*model.Enterprise
	users, getErr := database.GetAllUsernames()
	v, vErr := database.GetAllVreels()
	ent, _ := database.GetAllEnterprises()

	for _, enterprise := range ent {
		o := enterprise
		enterprises = append(enterprises, &o)
	}
	if vErr != nil {
	} else {
		if getErr != nil {
			err = e.FAILED_GET_USERNAME
		} else {
			for _, u := range users {
				var username = u.Username
				usernames = append(usernames, &username)
			}
			for _, o := range v {
				r, _ := o.ToVreel([]*model.Slide{})
				vreels = append(vreels, &r)
			}
			userCount = len(usernames)

		}
	}
	return model.ServerAnalytics{
		UserCount:   userCount,
		Usernames:   usernames,
		Vreels:      vreels,
		Enterprises: enterprises,
	}, err
}
