package model

import (
	"encoding/json"
	"log"

	"github.com/lib/pq"
	"gorm.io/gorm"
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
	VEmail             string         `json:"v_email"`
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
	LinkedinUrl        string         `json:"linkedin_url"`
	Note               string         `json:"note"`
	Pages              pq.StringArray `gorm:"type:text[]"`
	PagesRef           string         `json:"pagesRef"`
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
	gorm.Model
	ID              string         `json:"id"`
	Author          string         `json:"author"`
	LogoURI         string         `json:"logo_uri"`
	PageTitle       string         `json:"page_title"`
	ButtonURI       *string        `json:"button_uri"`
	Slides          pq.StringArray `gorm:"type:text[]"`
	Elements        string         `json:"elements"`
	SimpleLinks     pq.StringArray `gorm:"type:text[]"`
	Gallery         pq.StringArray `gorm:"type:text[]"`
	Socials         pq.StringArray `gorm:"type:text[]"`
	VideoGallery    pq.StringArray `gorm:"type:text[]"`
	TimeLastEdited  int            `json:"time_last_edited"`
	LastSlideEdited string         `json:"last_slide_edited"`
}

type SlideModel struct {
	ID            string `json:"id"`
	Active        bool   `json:"active"`
	ContentType   string `json:"content_type"`
	LogoURI       string `json:"logo_uri"`
	LogoVisible   bool   `json:"logo_visible"`
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

type SimpleLinksElementModel struct {
	gorm.Model
	ID       string
	Parent   string
	Header   string         `json:"header"`
	Hidden   bool           `json:"hidden"`
	Position int            `json:"position"`
	Links    pq.StringArray `gorm:"type:text[]"`
}

type SimpleLinkModel struct {
	// gorm.Model
	ID         string `gorm:"primaryKey"`
	Parent     string `json:"parent"`
	Hidden     bool   `json:"hidden"`
	Position   int    `json:"position"`
	Thumbnail  string `json:"thumbnail"`
	LinkHeader string `json:"link_header"`
	URL        string `json:"url"`
	LinkType   string `json:"link_type"`
	Tag        string `json:"tag"`
}

type GalleryElementModel struct {
	ID       string         `json:"id"`
	Parent   string         `json:"parent"`
	Header   string         `json:"header"`
	Position int            `json:"position"`
	Images   pq.StringArray `gorm:"type:text[]"`
	Hidden   bool           `json:"hidden"`
}

type GalleryImageModel struct {
	ID          string `json:"id"`
	Parent      string `json:"parent"`
	Hidden      bool   `json:"hidden"`
	Position    *int   `json:"position"`
	Cta1        string `json:"cta1"`
	Cta2        string `json:"cta2"`
	Desktop     string `json:"desktop"`
	Mobile      string `json:"mobile"`
	ImageHeader string `json:"image_header"`
	Description string `json:"description"`
}

type VideoGalleryElementModel struct {
	ID       string         `json:"id"`
	Header   string         `json:"header"`
	Parent   string         `json:"parent"`
	Position int            `json:"position"`
	Videos   pq.StringArray `gorm:"type:text[]"`
	Hidden   bool           `json:"hidden"`
}

type VideoModel struct {
	ID          string `json:"id"`
	Hidden      bool   `json:"hidden"`
	Parent      string `json:"parent"`
	Position    int    `json:"position"`
	Cta1        string `json:"cta1"`
	Cta2        string `json:"cta2"`
	Desktop     string `json:"desktop"`
	Mobile      string `json:"mobile"`
	VideoHeader string `json:"video_header"`
	Description string `json:"description"`
}

type SocialElementModel struct {
	ID       string         `json:"id" gorm:"primaryKey"`
	Parent   string         `json:"parent"`
	Position int            `json:"position"`
	Hidden   bool           `json:"hidden"`
	Header   string         `json:"header"`
	Socials  pq.StringArray `gorm:"type:text[]"`
}

type SocialsModel struct {
	ID       string
	Parent   string
	Position int    `json:"position"`
	Platform string `json:"platform"`
	Username string `json:"username"`
}
type AnalyticsModel struct {
	Likes pq.StringArray `gorm:"type:text[]"`
}

func (c *SocialElementModel) ToSocialsElement() SocialsElement {
	return SocialsElement{
		ID:       c.ID,
		Parent:   c.Parent,
		Position: c.Position,
		Hidden:   c.Hidden,
		Header:   c.Header,
	}
}
func (c *SocialsModel) ToSocial() Socials {

	return Socials{
		Position: c.Position,
		Platform: c.Platform,
		Username: c.Username,
	}
}

func (c *SocialsInput) ToDatabaseModel() SocialsModel {
	s := ""
	i := 0

	if c.Platform == nil {
		c.Platform = &s
	}
	if c.Position == nil {
		c.Position = &i
	}
	if c.Username == nil {
		c.Username = &s
	}
	return SocialsModel{
		Position: *c.Position,
		Platform: *c.Platform,
		Username: *c.Username,
	}
}

func (c *AddVideoInput) ToDatabaseModel() VideoModel {
	s := ""
	i := 0
	cta1, _ := json.Marshal(c.Cta1)
	cta2, _ := json.Marshal(c.Cta2)

	desktop, _ := json.Marshal(c.Desktop)
	mobile, _ := json.Marshal(c.Mobile)

	if c.Cta1 == nil {
		cta1 = []byte("")
	}
	if c.Cta2 == nil {
		cta2 = []byte("")
	}
	if c.Desktop == nil {
		desktop = []byte("")
	}
	if c.Mobile == nil {
		mobile = []byte("")
	}
	if c.Description == nil {
		c.Description = &s
	}
	if c.VideoHeader == nil {
		c.VideoHeader = &s
	}
	if c.Position == nil {
		c.Position = &i
	}

	return VideoModel{
		Position:    *c.Position,
		Hidden:      false,
		Cta1:        string(cta1),
		Cta2:        string(cta2),
		Desktop:     string(desktop),
		Mobile:      string(mobile),
		VideoHeader: *c.VideoHeader,
		Description: *c.Description,
	}
}

func (c *VideoGalleryElementModel) ToVideoGalleryElement() VideoGalleryElement {
	return VideoGalleryElement{
		ID:       c.ID,
		Header:   c.Header,
		Parent:   c.Parent,
		Position: c.Position,
		Hidden:   c.Hidden,
	}
}

func (c *VideoModel) ToVideo() Video {
	cta1 := Cta{}
	cta2 := Cta{}

	desktop := Content{}
	mobile := Content{}

	json.Unmarshal([]byte(c.Cta1), &cta1)
	json.Unmarshal([]byte(c.Cta2), &cta2)

	json.Unmarshal([]byte(c.Desktop), &desktop)
	json.Unmarshal([]byte(c.Mobile), &mobile)
	return Video{
		ID:          c.ID,
		Parent:      c.Parent,
		Position:    c.Position,
		Cta1:        &cta1,
		Cta2:        &cta2,
		Desktop:     &desktop,
		Mobile:      &mobile,
		VideoHeader: c.VideoHeader,
		Description: c.Description,
	}
}

// type Analytics struct {
// 	Today AnalyticsChunkModel
// 	LastWeek AnalyticsChunkModel
// 	ThisYear AnalyticsChunkModel
// }
// Position    *int          `json:"position"`
// Cta1        *CTAInput     `json:"cta1"`
// Cta2        *CTAInput     `json:"cta2"`
// Desktop     *ContentInput `json:"desktop"`
// Mobile      *ContentInput `json:"mobile"`
// ImageHeader string        `json:"image_header"`
// Description string        `json:"description"`

func (c *GalleryImageModel) ToGalleryImage() GalleryImage {
	cta1 := Cta{}
	cta2 := Cta{}

	desktop := Content{}
	mobile := Content{}

	json.Unmarshal([]byte(c.Cta1), &cta1)
	json.Unmarshal([]byte(c.Cta2), &cta2)

	json.Unmarshal([]byte(c.Desktop), &desktop)
	json.Unmarshal([]byte(c.Mobile), &mobile)
	return GalleryImage{
		ID:       c.ID,
		Position: c.Position,
		Parent:   c.Parent,
		Desktop:  &desktop,
		Mobile:   &mobile,
		Cta1:     &cta1,
		Cta2:     &cta2,
	}
}

func (c *GalleryElementModel) ToGalleryElement() GalleryElement {
	return GalleryElement{
		ID:       c.ID,
		Hidden:   c.Hidden,
		Header:   c.Header,
		Position: c.Position,
		Parent:   c.Parent,
	}
}
func (c *AddGalleryImageInput) ToDatabaseModel() GalleryImageModel {
	s := ""
	i := 0
	cta1, _ := json.Marshal(c.Cta1)
	cta2, _ := json.Marshal(c.Cta2)

	desktop, _ := json.Marshal(c.Desktop)
	mobile, _ := json.Marshal(c.Mobile)

	if c.Cta1 == nil {
		cta1 = []byte("")
	}
	if c.Cta2 == nil {
		cta2 = []byte("")
	}
	if c.Desktop == nil {
		desktop = []byte("")
	}
	if c.Mobile == nil {
		mobile = []byte("")
	}
	if c.Description == nil {
		c.Description = &s
	}
	if c.ImageHeader == nil {
		c.ImageHeader = &s
	}
	if c.Position == nil {
		c.Position = &i
	}
	return GalleryImageModel{
		ID:          "",
		Hidden:      false,
		Position:    c.Position,
		Cta1:        string(cta1),
		Cta2:        string(cta2),
		Desktop:     string(desktop),
		Mobile:      string(mobile),
		ImageHeader: *c.ImageHeader,
		Description: *c.Description,
	}
}

func (c *SimpleLinksElementModel) ToSimpleLinksElement() SimpleLinksElement {
	linksList := []*SimpleLink{}
	// for _, l := range c.Links {
	// 	t := l.ToSimpleLink()

	// 	linksList = append(linksList, &t)

	// }
	return SimpleLinksElement{
		ID:       c.ID,
		Header:   c.Header,
		Parent:   c.Parent,
		Hidden:   false,
		Position: 0,
		Links:    linksList,
	}
}

func (c *SimpleLinkModel) ToSimpleLink() SimpleLink {
	return SimpleLink{
		ID:         c.ID,
		Hidden:     c.Hidden,
		Position:   c.Position,
		Thumbnail:  c.Thumbnail,
		LinkHeader: c.LinkHeader,
		URL:        c.URL,
		LinkType:   c.LinkType,
		Tag:        c.Tag,
		Parent:     c.Parent,
	}
}

func (c *SimpleLinkInput) ToDatabaseModel() SimpleLinkModel {
	i := 0
	s := ""
	if c.Thumbnail == nil {
		c.Thumbnail = &s
	}
	if c.LinkHeader == nil {
		c.LinkHeader = &s
	}
	if c.Position == nil {
		c.Position = &i
	}
	if c.URL == nil {
		c.URL = &s
	}
	if c.Tag == nil {
		c.Tag = &s
	}
	if c.LinkType == nil {
		c.LinkType = &s
	}
	return SimpleLinkModel{
		Hidden:     false,
		Position:   *c.Position,
		Thumbnail:  *c.Thumbnail,
		LinkHeader: *c.LinkHeader,
		URL:        *c.URL,
		LinkType:   *c.LinkType,
		Tag:        *c.Tag,
	}
}
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
		VEmail:             c.Email,
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
		LinkedinUrl:        "",
		Note:               "",
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
		VEmail:             &c.VEmail,
		AccountType:        c.AccountType,
		Liked:              liked,
		CompanyName:        c.CompanyName,
		Title:              "",
		ProfilePicture:     c.ProfilePicture,
		LinkedinURL:        &c.LinkedinUrl,
		SelfPortraitImage:  &c.SelfPortraitImage,
		SelfLandscapeImage: &c.SelfLandscapeImage,
		Following:          following,
		Username:           c.Username,
		FirstName:          c.FirstName,
		LastName:           c.LastName,
		MiddleInitial:      c.MiddleInitial,
		Prefix:             "",
		Suffix:             "",
		Email:              c.Email,
		HomePhone:          c.HomePhone,
		CellPhone:          c.CellPhone,
		WorkPhone:          c.WorkPhone,
		Password:           c.Password,
		BusinessAddress:    c.BusinessAddress,
		HomeAddress:        c.HomeAddress,
		Website:            c.Website,
		LandingPage:        c.LandingPage,
		JobTitle:           c.JobTitle,
		Groups:             []*Group{},
		Vreel:              &Vreel{},
		Files:              &Files{},
		News:               []*Slide{},
		Note:               c.Note,
		PagesRef:           &c.PagesRef,
	}
}

// func(c *SlideInput) ToDatabaseModel() SlideModel {
// 	var title string = nil
// 	if c.Title != nil {
// 		r, _ := json.Marshal(c.Title)
// 		title =
// 	}
// 	return SlideModel{

// 	}
// }

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
		Active:        c.Active,
		SlideLocation: c.SlideLocation,
		Title:         string(t),
		Advanced:      string(a),
		CTA1:          string(cta1),
		CTA2:          string(cta2),
		Mobile:        string(m_cotent),
		Desktop:       string(d_content),
		MoreInfo:      string(more_info),
		LogoURI:       c.LogoURI,
		LogoVisible:   c.LogoVisible,
		// Metadata:      *c.Metadata,
	}
}

func (c VreelModel) ToVreel(slides []*Slide) (Vreel, error) {
	var err error
	var e VreelElements
	var simpleLinks []*SimpleLinksElement

	// for _, l := range c.SimpleLinks {
	// 	t := l.ToSimpleLinksElement()
	// 	fmt.Println("existsssssss")
	// 	simpleLinks = append(simpleLinks, &t)
	// }
	gErr := json.Unmarshal([]byte(c.Elements), &e)
	if gErr != nil {
		log.Println("im the problem!! ")
	} else {
		if e.SimpleLinks != nil {

			if e.SimpleLinks.Hidden {
				e.SimpleLinks = nil
			}
		}

		if e.Socials != nil {
			if e.Socials.Hidden {
				e.Socials = nil
			}
		}

		if e.Gallery != nil {
			if e.Gallery.Hidden {
				e.Gallery = nil
			}
		}
		if e.Videos != nil {
			if e.Videos.Hidden {
				e.Videos = nil
			}
		}
	}
	if gErr != nil {
		err = gErr
	}
	return Vreel{
		ID:              c.ID,
		Author:          c.Author,
		Elements:        &e,
		PageTitle:       c.PageTitle,
		ButtonURI:       c.ButtonURI,
		Slides:          slides,
		LogoURI:         &c.LogoURI,
		LastSlideEdited: &c.LastSlideEdited,
		TimeLastEdited:  &c.TimeLastEdited,
		SimpleLinks:     simpleLinks,
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
		LogoVisible:   true,
		CTA1:          string(cta),
		CTA2:          string(cta),
		Title:         string(title),
		Mobile:        string(content),
		Desktop:       string(content),
		Advanced:      string(advanced),
	}
}

func (c *SlideModel) ToSlide() Slide {
	log.Println("[logo visibility]: ", c.LogoVisible)
	log.Println("[slide active]: ", c.Active)
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
		Active:        c.Active,
		LogoURI:       c.LogoURI,
		LogoVisible:   c.LogoVisible,
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

func (c *SimpleLinkInput) ToLink(id string) SimpleLink {
	return SimpleLink{
		ID:         id,
		Position:   *c.Position,
		Thumbnail:  *c.Thumbnail,
		LinkHeader: *c.LinkHeader,
		LinkType:   *c.LinkType,
		URL:        *c.URL,
		Tag:        *c.Tag,
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
		VideoHeader: *c.VideoHeader,
		Desktop:     (*Content)(c.Desktop),
		Mobile:      (*Content)(c.Mobile),
		Description: *c.Description,
		Cta1:        (*Cta)(c.Cta1),
		Cta2:        (*Cta)(c.Cta2),
	}
}

func (s *SocialsInput) ToLink() Socials {
	return Socials{
		Platform: *s.Platform,
		Username: *s.Username,
		Position: *s.Position,
	}
}

// }
