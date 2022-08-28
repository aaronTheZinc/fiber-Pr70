// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AddGalleryImageInput struct {
	Position    *int          `json:"position"`
	Cta1        *CTAInput     `json:"cta1"`
	Cta2        *CTAInput     `json:"cta2"`
	Desktop     *ContentInput `json:"desktop"`
	Mobile      *ContentInput `json:"mobile"`
	ImageHeader string        `json:"image_header"`
	Description string        `json:"description"`
}

type AddVideoInput struct {
	Position    *int          `json:"position"`
	Cta1        *CTAInput     `json:"cta1"`
	Cta2        *CTAInput     `json:"cta2"`
	Desktop     *ContentInput `json:"desktop"`
	Mobile      *ContentInput `json:"mobile"`
	VideoHeader string        `json:"video_header"`
	Description string        `json:"description"`
}

type Advanced struct {
	Info                  *Info   `json:"info"`
	Header                string  `json:"header"`
	LinkType              string  `json:"link_type"`
	LogoURL               *string `json:"logoUrl"`
	IsDarkMode            *bool   `json:"isDarkMode"`
	BackgroundAudioSource string  `json:"background_audio_source"`
	BackgroundAudioURL    string  `json:"background_audio_url"`
}

type AnalyticFragment struct {
	ID        string `json:"id"`
	Author    string `json:"author"`
	Target    string `json:"target"`
	Action    string `json:"action"`
	TimeStamp int    `json:"time_stamp"`
}

type Analytics struct {
	ID             string `json:"id"`
	Followers      int    `json:"followers"`
	Likes          int    `json:"likes"`
	AddToContacts  int    `json:"add_to_contacts"`
	Calls          int    `json:"calls"`
	Views          int    `json:"views"`
	Clicks         int    `json:"clicks"`
	ConversionRate int    `json:"conversion_rate"`
	Shares         int    `json:"shares"`
	QrViews        int    `json:"qr_views"`
}

type AnalyticsMutation struct {
	Target string `json:"target"`
	Token  string `json:"token"`
}

type Cta struct {
	LinkHeader string `json:"link_header"`
	LinkType   string `json:"link_type"`
	LinkURL    string `json:"link_url"`
}

type CTAInput struct {
	LinkHeader string `json:"link_header"`
	LinkType   string `json:"link_type"`
	LinkURL    string `json:"link_url"`
}

type Contact struct {
	Position int    `json:"position"`
	Header   string `json:"header"`
	Hidden   *bool  `json:"hidden"`
}

type Content struct {
	StartTime          *int    `json:"start_time"`
	StopTime           *int    `json:"stop_time"`
	BackgroundAudioURI *string `json:"background_audio_uri"`
	ContentType        string  `json:"content_type"`
	URI                string  `json:"uri"`
}

type ContentInput struct {
	StartTime          *int    `json:"start_time"`
	StopTime           *int    `json:"stop_time"`
	BackgroundAudioURI *string `json:"background_audio_uri"`
	ContentType        string  `json:"content_type"`
	URI                string  `json:"uri"`
}

type Contribution struct {
	ID       string `json:"id"`
	Platform string `json:"platform"`
	Link     string `json:"link"`
}

type ContributionsElement struct {
	Header        string          `json:"header"`
	Contributions []*Contribution `json:"contributions"`
}

type ContributionsInput struct {
	Platform string `json:"platform"`
	Link     string `json:"link"`
}

type CreateSlide struct {
	ContentType   string `json:"content_type"`
	URI           string `json:"uri"`
	SlideLocation int    `json:"slide_location"`
}

type Credit struct {
	CreditType   string `json:"credit_type"`
	AccreditedID string `json:"accredited_id"`
}

type Enterprise struct {
	ID        *string `json:"id"`
	Name      string  `json:"name"`
	Owner     string  `json:"owner"`
	Email     string  `json:"email"`
	Employees []*User `json:"employees"`
	Vreel     *Vreel  `json:"vreel"`
}

type EnterpriseEmployee struct {
	Employee *User  `json:"employee"`
	Vreel    *Vreel `json:"vreel"`
}

type Event struct {
	ID          string   `json:"ID"`
	Author      string   `json:"author"`
	Name        string   `json:"name"`
	Thumbnail   string   `json:"thumbnail"`
	StartTime   string   `json:"start_time"`
	EndTime     string   `json:"end_time"`
	Description string   `json:"description"`
	Location    string   `json:"location"`
	GroupID     string   `json:"group_id"`
	Repeat      string   `json:"repeat"`
	Link        string   `json:"link"`
	Groups      []string `json:"groups"`
}

type File struct {
	ID       string `json:"id"`
	FileName string `json:"file_name"`
	FileType string `json:"file_type"`
	URI      string `json:"uri"`
	FileSize int    `json:"file_size"`
}

type Files struct {
	FileCount int     `json:"file_count"`
	Files     []*File `json:"files"`
}

type Gallery struct {
	Header   string          `json:"header"`
	Position int             `json:"position"`
	Images   []*GalleryImage `json:"images"`
	Hidden   bool            `json:"hidden"`
}

type GalleryElement struct {
	ID       string          `json:"id"`
	Parent   string          `json:"parent"`
	Header   string          `json:"header"`
	Position int             `json:"position"`
	Images   []*GalleryImage `json:"images"`
	Hidden   bool            `json:"hidden"`
}

type GalleryImage struct {
	ID          string   `json:"id"`
	Hidden      bool     `json:"hidden"`
	Parent      string   `json:"parent"`
	Position    *int     `json:"position"`
	Cta1        *Cta     `json:"cta1"`
	Cta2        *Cta     `json:"cta2"`
	Desktop     *Content `json:"desktop"`
	Mobile      *Content `json:"mobile"`
	ImageHeader string   `json:"image_header"`
	Description string   `json:"description"`
}

type Group struct {
	ID          string   `json:"id"`
	Author      string   `json:"author"`
	Name        string   `json:"name"`
	Location    string   `json:"location"`
	MeetTimes   []string `json:"meet_times"`
	Private     bool     `json:"private"`
	ParentGroup string   `json:"parent_group"`
	ChildGroups []*Group `json:"child_groups"`
	Members     []string `json:"members"`
	Events      []*Event `json:"events"`
	Vreel       *Vreel   `json:"vreel"`
}

type Info struct {
	Header                string   `json:"header"`
	Description           string   `json:"description"`
	Collaborators         []string `json:"collaborators"`
	Credits               []string `json:"credits"`
	BackgroundAudioCredit string   `json:"background_audio_credit"`
	MusicCredit           string   `json:"music_credit"`
}

type Link struct {
	Position      int     `json:"position"`
	Thumbnail     string  `json:"thumbnail"`
	URL           string  `json:"url"`
	Category      string  `json:"category"`
	LinkType      string  `json:"link_type"`
	LinkHeader    string  `json:"link_header"`
	LinkSubHeader *string `json:"link_sub_header"`
	Tag           string  `json:"tag"`
}

type LocalSession struct {
	Token string `json:"token"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type MoreInfo struct {
	Title         *string   `json:"title"`
	Description   *string   `json:"description"`
	Collaborators []string  `json:"collaborators"`
	Credits       []*Credit `json:"credits"`
}

type Music struct {
	ID       string `json:"id"`
	Platform string `json:"platform"`
	Link     string `json:"link"`
}

type MusicElement struct {
	Header string   `json:"header"`
	Music  []*Music `json:"music"`
}

type MusicInput struct {
	Platform string `json:"platform"`
	Link     string `json:"link"`
}

type MutationResponse struct {
	Succeeded bool   `json:"succeeded"`
	Message   string `json:"message"`
}

type NewEnterprise struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type NewEvent struct {
	Name        string   `json:"name"`
	Thumbnail   string   `json:"thumbnail"`
	StartTime   string   `json:"start_time"`
	EndTime     string   `json:"end_time"`
	Description string   `json:"description"`
	Location    string   `json:"location"`
	GroupID     string   `json:"group_id"`
	Repeat      string   `json:"repeat"`
	Link        string   `json:"link"`
	Groups      []string `json:"groups"`
}

type NewGroup struct {
	Token       string   `json:"token"`
	Name        string   `json:"name"`
	Location    string   `json:"location"`
	MeetTimes   []string `json:"meet_times"`
	Private     bool     `json:"private"`
	ParentGroup string   `json:"parent_group"`
}

type NewUser struct {
	Username        string  `json:"username"`
	AccountType     string  `json:"account_type"`
	FirstName       *string `json:"first_name"`
	LastName        *string `json:"last_name"`
	Email           string  `json:"email"`
	PhoneNumber     *string `json:"phone_number"`
	Password        *string `json:"password"`
	BusinessAddress *string `json:"business_address"`
	BillingAddress  *string `json:"billing_address"`
	Website         *string `json:"website"`
	JobTitle        *string `json:"job_title"`
}

type ResetPasswordInput struct {
	Email string `json:"email"`
}

type ResetPasswordResponse struct {
	Message     string `json:"message"`
	EmailExists bool   `json:"email_exists"`
	ResetToken  string `json:"reset_token"`
}

type ResolvedPasswordReset struct {
	Message   string `json:"message"`
	Succeeded bool   `json:"succeeded"`
}

type ServerAnalytics struct {
	Usernames   []*string     `json:"usernames"`
	Vreels      []*Vreel      `json:"vreels"`
	Enterprises []*Enterprise `json:"enterprises"`
	UserCount   int           `json:"userCount"`
}

type Service struct {
	Position int       `json:"position"`
	Header   string    `json:"header"`
	Info     *TextArea `json:"info"`
	Hidden   *bool     `json:"hidden"`
}

type SimpleLink struct {
	ID         string `json:"id"`
	Parent     string `json:"parent"`
	Hidden     bool   `json:"hidden"`
	Position   int    `json:"position"`
	Thumbnail  string `json:"thumbnail"`
	LinkHeader string `json:"link_header"`
	URL        string `json:"url"`
	LinkType   string `json:"link_type"`
	Tag        string `json:"tag"`
}

type SimpleLinkInput struct {
	Position   int    `json:"position"`
	Thumbnail  string `json:"thumbnail"`
	LinkHeader string `json:"link_header"`
	URL        string `json:"url"`
	LinkType   string `json:"link_type"`
	Tag        string `json:"tag"`
}

type SimpleLinksElement struct {
	ID       string        `json:"id"`
	Parent   string        `json:"parent"`
	Header   string        `json:"header"`
	Hidden   bool          `json:"hidden"`
	Position int           `json:"position"`
	Links    []*SimpleLink `json:"links"`
}

type Slide struct {
	ID            string         `json:"id"`
	Author        string         `json:"author"`
	Active        bool           `json:"active"`
	ContentType   string         `json:"content_type"`
	LogoURI       *string        `json:"logo_uri"`
	LogoVisible   *bool          `json:"logo_visible"`
	URI           string         `json:"uri"`
	SlideLocation int            `json:"slide_location"`
	Title         *Title         `json:"title"`
	Metadata      *SlideMetaData `json:"metadata"`
	Mobile        *Content       `json:"mobile"`
	Desktop       *Content       `json:"desktop"`
	Cta1          *Cta           `json:"cta1"`
	Cta2          *Cta           `json:"cta2"`
	Advanced      *Advanced      `json:"advanced"`
	Info          *MoreInfo      `json:"info"`
}

type SlideInput struct {
	SlideLocation *int        `json:"slide_location"`
	Title         *TitleInput `json:"title"`
	Mobile        *CTAInput   `json:"mobile"`
	Desktop       *CTAInput   `json:"desktop"`
}

type SlideMetaData struct {
	Created string `json:"created"`
	Size    string `json:"size"`
}

type Socials struct {
	Position int    `json:"position"`
	Platform string `json:"platform"`
	Username string `json:"username"`
}

type SocialsElement struct {
	ID       string     `json:"id"`
	Parent   string     `json:"parent"`
	Position int        `json:"position"`
	Hidden   bool       `json:"hidden"`
	Header   string     `json:"header"`
	Socials  []*Socials `json:"socials"`
}

type SocialsInput struct {
	Position int    `json:"position"`
	Platform string `json:"platform"`
	Username string `json:"username"`
}

type SuperLink struct {
	ID            string `json:"id"`
	Thumbnail     string `json:"thumbnail"`
	LinkHeader    string `json:"link_header"`
	LinkSubHeader string `json:"link_sub_header"`
	URL           string `json:"url"`
	LinkType      string `json:"link_type"`
	Description   string `json:"description"`
}

type SuperLinkInput struct {
	Thumbnail     string `json:"thumbnail"`
	LinkHeader    string `json:"link_header"`
	LinkSubHeader string `json:"link_sub_header"`
	URL           string `json:"url"`
	LinkType      string `json:"link_type"`
	Description   string `json:"description"`
}

type TextArea struct {
	Header   string `json:"header"`
	Position int    `json:"position"`
	Content  string `json:"content"`
	Hidden   *bool  `json:"hidden"`
}

type Title struct {
	Header      string `json:"header"`
	Description string `json:"description"`
}

type TitleInput struct {
	Header      *string `json:"header"`
	Description *string `json:"description"`
}

type User struct {
	ID                 string    `json:"id"`
	AccountType        string    `json:"account_type"`
	Liked              []*string `json:"liked"`
	CompanyName        string    `json:"companyName"`
	Title              string    `json:"title"`
	ProfilePicture     string    `json:"profilePicture"`
	LinkedinURL        *string   `json:"linkedinUrl"`
	SelfPortraitImage  *string   `json:"selfPortraitImage"`
	SelfLandscapeImage *string   `json:"selfLandscapeImage"`
	Following          []*string `json:"following"`
	Username           string    `json:"username"`
	FirstName          string    `json:"first_name"`
	LastName           string    `json:"last_name"`
	MiddleInitial      string    `json:"middle_initial"`
	PagesRef           *string   `json:"pagesRef"`
	Prefix             string    `json:"prefix"`
	Suffix             string    `json:"suffix"`
	Email              string    `json:"email"`
	VEmail             *string   `json:"v_email"`
	HomePhone          string    `json:"home_phone"`
	CellPhone          string    `json:"cell_phone"`
	WorkPhone          string    `json:"work_phone"`
	Password           string    `json:"password"`
	BusinessAddress    string    `json:"business_address"`
	HomeAddress        string    `json:"home_address"`
	Website            string    `json:"website"`
	LandingPage        string    `json:"landing_page"`
	JobTitle           string    `json:"job_title"`
	Groups             []*Group  `json:"groups"`
	Vreel              *Vreel    `json:"vreel"`
	Files              *Files    `json:"files"`
	News               []*Slide  `json:"news"`
	Note               string    `json:"note"`
	Pages              []*Vreel  `json:"pages"`
}

type Video struct {
	ID          string   `json:"id"`
	Hidden      bool     `json:"hidden"`
	Parent      string   `json:"parent"`
	Position    int      `json:"position"`
	Cta1        *Cta     `json:"cta1"`
	Cta2        *Cta     `json:"cta2"`
	Desktop     *Content `json:"desktop"`
	Mobile      *Content `json:"mobile"`
	VideoHeader string   `json:"video_header"`
	Description string   `json:"description"`
}

type VideoGalleryElement struct {
	ID       string   `json:"id"`
	Header   string   `json:"header"`
	Parent   string   `json:"parent"`
	Position int      `json:"position"`
	Videos   []*Video `json:"videos"`
	Hidden   bool     `json:"hidden"`
}

type Videos struct {
	Header   string   `json:"header"`
	Position int      `json:"position"`
	Videos   []*Video `json:"videos"`
	Hidden   bool     `json:"hidden"`
}

type Vreel struct {
	ID              string                 `json:"id"`
	Author          string                 `json:"author"`
	LogoURI         *string                `json:"logo_uri"`
	PageTitle       string                 `json:"page_title"`
	ButtonURI       *string                `json:"button_uri"`
	Slides          []*Slide               `json:"slides"`
	Elements        *VreelElements         `json:"elements"`
	SimpleLinks     []*SimpleLinksElement  `json:"simple_links"`
	Gallery         []*GalleryElement      `json:"gallery"`
	VideoGallery    []*VideoGalleryElement `json:"video_gallery"`
	Socials         []*SocialsElement      `json:"socials"`
	SlideCount      *int                   `json:"slide_count"`
	LastSlideEdited *string                `json:"LastSlideEdited"`
	TimeLastEdited  *int                   `json:"TimeLastEdited"`
}

type VreelElements struct {
	TextArea      *TextArea             `json:"text_area"`
	Videos        *Videos               `json:"videos"`
	Gallery       *Gallery              `json:"gallery"`
	Services      *Service              `json:"services"`
	Music         *MusicElement         `json:"music"`
	Socials       *SocialsElement       `json:"socials"`
	SimpleLinks   *SimpleLinksElement   `json:"simple_links"`
	SuperLinks    []*SuperLink          `json:"super_links"`
	Contact       *Contact              `json:"contact"`
	Contributions *ContributionsElement `json:"contributions"`
}

type VreelFields struct {
	Field string `json:"field"`
	Value string `json:"value"`
}
