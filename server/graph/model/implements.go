package model

import (
	"github.com/lib/pq"
)

type UserModel struct {
	ID              string         `gorm:"primaryKey"`
	Username        string         `json:"username"`
	FirstName       string         `json:"first_name"`
	LastName        string         `json:"last_name"`
	Email           string         `json:"email"`
	PhoneNumber     string         `json:"phone_number"`
	Password        string         `json:"password"`
	BusinessAddress string         `json:"business_address"`
	BillingAddress  string         `json:"billing_address"`
	Website         string         `json:"website"`
	JobTitle        string         `json:"job_title"`
	Groups          pq.StringArray `gorm:"type:text[]"`
}
type GroupModel struct {
	ID          string         `json:"id"`
	Author      string         `json:"author"`
	Name        string         `json:"name"`
	Location    string         `json:"location"`
	Private     bool           `json:"private"`
	ParentGroup string         `json:"parent_group"`
	ChildGroups pq.StringArray `gorm:"type:text[]"`
	MeetTimes   pq.StringArray `gorm:"type:text[]"`
}

func (c *NewUser) ToDatabaseModel() UserModel {
	// var groups pq.StringArray

	return UserModel{
		Username:        c.Username,
		FirstName:       c.FirstName,
		LastName:        c.LastName,
		Email:           c.Email,
		Password:        c.Password,
		PhoneNumber:     c.PhoneNumber,
		BusinessAddress: c.BusinessAddress,
		BillingAddress:  c.BillingAddress,
		Website:         c.Website,
		JobTitle:        c.JobTitle,
		Groups:          []string{},
	}

}

// func (c *UserModel) ToUser() User {
// 	return User{

// 	}
// }

func (c *UserModel) ToUser() User {

	return User{
		ID:              c.ID,
		Username:        c.Username,
		FirstName:       c.FirstName,
		LastName:        c.LastName,
		Email:           c.Email,
		PhoneNumber:     c.PhoneNumber,
		BusinessAddress: c.BusinessAddress,
		BillingAddress:  c.BillingAddress,
		Website:         c.Website,
		JobTitle:        c.JobTitle,
	}

}

func (c *Group) ToDatabaseModel() GroupModel {
	return GroupModel{
		ID:          c.ID,
		Author:      c.Author,
		Name:        c.Name,
		Location:    c.Location,
		MeetTimes:   []string{},
		Private:     c.Private,
		ParentGroup: c.ParentGroup,
		ChildGroups: []string{},
	}
}
