package model

import (
	"encoding/json"
	"log"

	"github.com/lib/pq"
)

type UserModel struct {
	ID                 string         `gorm:"primaryKey"`
	Username           string         `json:"username"`
	AccountType        string         `json:"accont_type"`
	MiddleInitial      string         `json:"middle_initial"`
	CompanyName        string         `json:"company_name"`
	ProfilePicture     string         `json:"profile_picture"`
	SelfPortraitImage  string         `json:"self_portrait_image"`
	SelfLandscapeImage string         `json:"self_landscape_image"`
	FirstName          string         `json:"first_name"`
	LastName           string         `json:"last_name"`
	Email              string         `json:"email"`
	HomePhone          string         `json:"home_phone"`
	CellPhone          string         `json:"cell_number"`
	WorkPhone          string         `json:"work_number"`
	Password           string         `json:"password"`
	BusinessAddress    string         `json:"business_address"`
	HomeAddress        string         `json:"billing_address"`
	Website            string         `json:"website"`
	JobTitle           string         `json:"job_title"`
	Groups             pq.StringArray `gorm:"type:text[]"`
	Following          pq.StringArray `gorm:"type:text[]"`
	Liked              pq.StringArray `gorm:"type:text[]"`
	LandingPage        string         `json:"landing_page"`
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
	ID              string         `json:"id"`
	Author          string         `json:"author"`
	LogoURI         string         `json:"logo_uri"`
	PageTitle       string         `json:"page_title"`
	ButtonURI       *string        `json:"button_uri"`
	Slides          pq.StringArray `gorm:"type:text[]"`
	Elements        string         `json:"elements"`
	TimeLastEdited  int            `json:"time_last_edited"`
	LastSlideEdited string         `json:"last_slide_edited"`
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
	CTA1          string `json:"cta1"`
	CTA2          string `json:"cta2"`
	Advanced      string `json:"advanced"`
	Metadata      string `json:"-"`
	MoreInfo      string `json:"more_info"`
}
type AnalyticsChunkModel struct {
}

type AnalyticsFragmentModel struct {
	ID        string `json:"id"`
	Author    string `json:"author"`
	Target    string `json:"target"`
	Action    string `json:"action"`
	TimeStamp int64  `json:"time_stamp"`
}

type AnalyticsModel struct {
	Likes pq.StringArray `gorm:"type:text[]"`
}

// type Analytics struct {
// 	Today AnalyticsChunkModel
// 	LastWeek AnalyticsChunkModel
// 	ThisYear AnalyticsChunkModel
// }

func (c *AnalyticsFragmentModel) ToAnalyticsFragment() AnalyticFragment {
	return AnalyticFragment{
		ID:        c.ID,
		Author:    c.Author,
		Target:    c.Target,
		Action:    c.Action,
		TimeStamp: int(c.TimeStamp),
	}
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
		Username:           c.Username,
		FirstName:          "",
		LastName:           "",
		Email:              c.Email,
		Password:           *c.Password,
		AccountType:        c.AccountType,
		HomePhone:          "",
		WorkPhone:          "",
		CellPhone:          "",
		BusinessAddress:    "",
		HomeAddress:        "",
		Website:            "",
		JobTitle:           "",
		LandingPage:        "",
		MiddleInitial:      "",
		Groups:             []string{},
		Following:          []string{},
		Liked:              []string{},
		SelfPortraitImage:  "",
		SelfLandscapeImage: "",
	}

}

// func (c *UserModel) ToUser() User {
// 	return User{

// 	}
// }

func (c *UserModel) ToUser() User {
	liked := []*string{}
	following := []*string{}

	for _, v := range c.Liked {
		o := v
		liked = append(liked, &o)
	}
	for _, v := range c.Following {
		o := v
		following = append(following, &o)
	}
	return User{
		ID:                 c.ID,
		Username:           c.Username,
		ProfilePicture:     c.ProfilePicture,
		FirstName:          c.FirstName,
		CompanyName:        c.CompanyName,
		LastName:           c.LastName,
		Email:              c.Email,
		Password:           c.Password,
		HomePhone:          c.HomePhone,
		WorkPhone:          c.WorkPhone,
		CellPhone:          c.CellPhone,
		BusinessAddress:    c.BusinessAddress,
		HomeAddress:        c.HomeAddress,
		Website:            c.Website,
		JobTitle:           c.JobTitle,
		AccountType:        c.AccountType,
		Following:          following,
		Liked:              liked,
		MiddleInitial:      c.MiddleInitial,
		LandingPage:        c.LandingPage,
		SelfPortraitImage:  &c.SelfPortraitImage,
		SelfLandscapeImage: &c.SelfLandscapeImage,
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
	t, _ := json.Marshal(c.Title)
	a, _ := json.Marshal(c.Advanced)
	cta1, _ := json.Marshal(c.Cta1)
	cta2, _ := json.Marshal(c.Cta2)
	m_cotent, _ := json.Marshal(c.Mobile)
	d_content, _ := json.Marshal(c.Desktop)
	more_info, _ := json.Marshal(c.Info)
	return SlideModel{
		ID:            c.ID,
		Author:        c.Author,
		ContentType:   c.ContentType,
		URI:           c.URI,
		SlideLocation: c.SlideLocation,
		Title:         string(t),
		Advanced:      string(a),
		CTA1:          string(cta1),
		CTA2:          string(cta2),
		Mobile:        string(m_cotent),
		Desktop:       string(d_content),
		MoreInfo:      string(more_info),
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
		log.Println("im the problem!! ")
	}
	if gErr != nil {
		err = gErr
	}
	return Vreel{
		Author:          c.Author,
		Elements:        &e,
		PageTitle:       c.PageTitle,
		ButtonURI:       c.ButtonURI,
		Slides:          slides,
		LogoURI:         &c.LogoURI,
		LastSlideEdited: &c.LastSlideEdited,
		TimeLastEdited:  &c.TimeLastEdited,
	}, err
}

// func (c Vreel) ToVreelModel(slides []*Slide) (Vreel, error) {
// 	var err error
// 	var e VreelElements

// 	// for _, sl := range c.Slides {
// 	// 	t, e := database.GetSlide(sl)
// 	// 	if e != nil {
// 	// 		err = e
// 	// 	}
// 	// 	s = append(s, &t)
// 	// }
// 	gErr := json.Unmarshal([]byte(c.Elements), &e)

// 	if gErr != nil {
// 		err = gErr
// 	}
// 	return Vreel{
// 		Author:    c.Author,
// 		Elements:  &e,
// 		PageTitle: c.PageTitle,
// 		ButtonURI: c.ButtonURI,
// 		Slides:    slides,
// 	}, err
// }

func CreateNewSlideModel(position int) SlideModel {
	n := 0
	title, _ := json.Marshal(Title{"", ""})
	advanced, _ := json.Marshal(Advanced{})
	content, _ := json.Marshal(Content{&n, &n, nil, "video", "/waterfall.mp4"})
	cta, _ := json.Marshal(Cta{"", "", ""})
	return SlideModel{
		ContentType:   "",
		SlideLocation: position,
		URI:           "",
		CTA1:          string(cta),
		CTA2:          string(cta),
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
	cta1 := Cta{}
	cta2 := Cta{}
	advanced := Advanced{}
	more_info := MoreInfo{}
	json.Unmarshal([]byte(c.Title), &title)
	json.Unmarshal([]byte(c.Mobile), &mobile)
	json.Unmarshal([]byte(c.Desktop), &desktop)
	json.Unmarshal([]byte(c.CTA1), &cta1)
	json.Unmarshal([]byte(c.CTA2), &cta2)
	json.Unmarshal([]byte(c.Advanced), &advanced)
	json.Unmarshal([]byte(c.MoreInfo), &more_info)

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
		Cta1:          &cta1,
		Cta2:          &cta2,
		Metadata:      &m,
		Info:          &more_info,
	}
}

func (c *SimpleLinkInput) ToLink() SimpleLink {
	return SimpleLink{
		Position:   c.Position,
		Thumbnail:  c.Thumbnail,
		LinkHeader: c.LinkHeader,
		LinkType:   c.LinkType,
		URL:        c.URL,
		Tag:        c.Tag,
	}
}
func (c *SuperLinkInput) ToLink() SuperLink {
	return SuperLink{
		Thumbnail:     c.Thumbnail,
		URL:           c.URL,
		LinkHeader:    c.LinkHeader,
		LinkSubHeader: c.LinkSubHeader,
		LinkType:      c.LinkType,
		Description:   c.Description,
	}
}
func (c *AddVideoInput) ToVideo() Video {
	return Video{
		Position:    *c.Position,
		VideoHeader: c.VideoHeader,
		Desktop:     (*Content)(c.Desktop),
		Mobile:      (*Content)(c.Mobile),
		Description: c.Description,
		Cta1:        (*Cta)(c.Cta1),
		Cta2:        (*Cta)(c.Cta2),
	}
}

// }
