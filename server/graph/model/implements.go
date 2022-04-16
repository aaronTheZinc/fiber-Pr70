package model

import (
	"encoding/json"

	"github.com/lib/pq"
)

type UserModel struct {
	ID              string         `gorm:"primaryKey"`
	Username        string         `json:"username"`
	AccountType     string         `json:"ac"`
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
	Members     pq.StringArray `gorm:"type:text[]"`
	ChildGroups pq.StringArray `gorm:"type:text[]"`
	MeetTimes   pq.StringArray `gorm:"type:text[]"`
}

type EventModel struct {
	ID          string         `json:"id"`
	Name        string         `json:"name"`
	Author      string         `json:"author"`
	Thumbnail   string         `json:"thumbnail"`
	StartTime   string         `json:"start_time"`
	EndTime     string         `json:"end_time"`
	Description string         `json:"description"`
	Location    string         `json:"location"`
	GroupID     string         `json:"group_id"`
	Repeat      string         `json:"repeat"`
	Link        string         `json:"link"`
	Groups      pq.StringArray `gorm:"type:text[]"`
}

type VreelModel struct {
	ID        string         `json:"id"`
	Author    string         `json:"author"`
	PageTitle string         `json:"page_title"`
	ButtonURI *string        `json:"button_uri"`
	Slides    pq.StringArray `gorm:"type:text[]"`
	Elements  string         `json:"elements"`
}

type SlideModel struct {
	ID            string `json:"id"`
	ContentType   string `json:"content_type"`
	Author        string `json:"author"`
	URI           string `json:"uri"`
	SlideLocation int    `json:"slide_location"`
	Title         string `json:"title"`
	Mobile        string `json:"mobile"`
	Desktop       string `json:"desktop"`
	CTA           string `json:"cta"`
	Advanced      string `json:"advaced"`
	Metadata      string `json:"metadata"`
}

type EnterpriseModel struct {
	ID        string         `json:"id"`
	Name      string         `json:"name"`
	Owner     string         `json:"owner"`
	Email     string         `json:"email"`
	Employees pq.StringArray `gorm:"type:text[]"`
}

func (c *NewEnterprise) ToModel() EnterpriseModel {
	return EnterpriseModel{
		Name:      c.Name,
		Owner:     "",
		Email:     c.Email,
		Employees: []string{},
	}
}

func (c *EnterpriseModel) ToEnterprise(employees []*User) Enterprise {
	return Enterprise{
		ID:        &c.ID,
		Name:      c.Name,
		Owner:     c.Owner,
		Email:     c.Email,
		Employees: employees,
	}
}

func (c *NewUser) ToDatabaseModel() UserModel {
	// var groups pq.StringArray
	return UserModel{
		Username:        c.Username,
		FirstName:       "",
		LastName:        "",
		Email:           c.Email,
		Password:        c.Password,
		AccountType:     c.AccountType,
		PhoneNumber:     "",
		BusinessAddress: "",
		BillingAddress:  "",
		Website:         "",
		JobTitle:        "",
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
		Password:        c.Password,
		PhoneNumber:     c.PhoneNumber,
		BusinessAddress: c.BusinessAddress,
		BillingAddress:  c.BillingAddress,
		Website:         c.Website,
		JobTitle:        c.JobTitle,
		AccountType:     c.AccountType,
	}
}

func (c *Group) ToDatabaseModel() GroupModel {
	return GroupModel{
		ID:          c.ID,
		Author:      c.Author,
		Name:        c.Name,
		Location:    c.Location,
		MeetTimes:   c.MeetTimes,
		Private:     c.Private,
		ParentGroup: c.ParentGroup,
		ChildGroups: []string{},
		Members:     c.Members,
	}
}

func (c *NewGroup) ToDatabaseModel() GroupModel {
	return GroupModel{
		Author:      "",
		Name:        c.Name,
		Location:    c.Location,
		Private:     c.Private,
		ParentGroup: c.ParentGroup,
		ChildGroups: []string{},
		MeetTimes:   c.MeetTimes,
	}
}

func (c *GroupModel) ToGroup() Group {
	return Group{
		ID:          c.ID,
		Author:      c.Author,
		Name:        c.Name,
		Location:    c.Location,
		Private:     c.Private,
		ParentGroup: c.ParentGroup,
		MeetTimes:   c.MeetTimes,
		Members:     c.Members,
	}
}

func (c *NewEvent) ToDatabaseModel() EventModel {
	return EventModel{
		Name:        c.Name,
		Thumbnail:   c.Thumbnail,
		StartTime:   c.StartTime,
		EndTime:     c.EndTime,
		Description: c.Description,
		Location:    c.Location,
		GroupID:     c.GroupID,
		Repeat:      c.Repeat,
		Link:        c.Link,
		Groups:      c.Groups,
	}
}
func (c *EventModel) ToEvent() Event {
	return Event{
		ID:          c.ID,
		Name:        c.Name,
		Author:      c.Author,
		Thumbnail:   c.Thumbnail,
		StartTime:   c.StartTime,
		EndTime:     c.EndTime,
		Description: c.Description,
		Location:    c.Location,
		GroupID:     c.GroupID,
		Repeat:      c.Repeat,
		Link:        c.Link,
		Groups:      c.Groups,
	}
}

func (c *Slide) ToDatabaseModel() SlideModel {
	return SlideModel{
		ID:            c.ID,
		ContentType:   c.ContentType,
		URI:           c.URI,
		SlideLocation: c.SlideLocation,
		// Metadata:      *c.Metadata,
	}
}

func (c VreelModel) ToVreel(slides []*Slide) (Vreel, error) {
	var err error
	var e VreelElements

	// for _, sl := range c.Slides {
	// 	t, e := database.GetSlide(sl)
	// 	if e != nil {
	// 		err = e
	// 	}
	// 	s = append(s, &t)
	// }
	gErr := json.Unmarshal([]byte(c.Elements), &e)

	if gErr != nil {
		err = gErr
	}
	return Vreel{
		Author:    c.Author,
		Elements:  &e,
		PageTitle: c.PageTitle,
		ButtonURI: c.ButtonURI,
		Slides:    slides,
	}, err
}

func CreateNewSlideModel() SlideModel {
	n := 0
	title, _ := json.Marshal(Title{"header", "description"})
	advanced, _ := json.Marshal(Advanced{"info", "link header", "link type"})
	content, _ := json.Marshal(Content{&n, &n, nil, "picture", "https://image"})
	cta, _ := json.Marshal(Cta{"link type", "link header", "link url"})
	return SlideModel{
		ContentType:   "c.ContentType",
		SlideLocation: 1,
		URI:           "",
		CTA:           string(cta),
		Title:         string(title),
		Mobile:        string(content),
		Desktop:       string(content),
		Advanced:      string(advanced),
	}
}

func (c *SlideModel) ToSlide() Slide {
	m := SlideMetaData{}
	title := Title{}
	mobile := Content{}
	desktop := Content{}
	cta := Cta{}
	advanced := Advanced{}
	json.Unmarshal([]byte(c.Title), &title)
	json.Unmarshal([]byte(c.Mobile), &mobile)
	json.Unmarshal([]byte(c.Desktop), &desktop)
	json.Unmarshal([]byte(c.CTA), &cta)
	json.Unmarshal([]byte(c.Advanced), &advanced)

	return Slide{
		ID:            c.ID,
		URI:           c.URI,
		Author:        c.Author,
		SlideLocation: c.SlideLocation,
		ContentType:   c.ContentType,
		Advanced:      &advanced,
		Title:         &title,
		Mobile:        &mobile,
		Desktop:       &desktop,
		Cta:           &cta,
		Metadata:      &m,
	}
}

// }
