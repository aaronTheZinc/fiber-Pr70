package database

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"sync"
	"time"

	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

type VreelContainer struct {
	M     *sync.Mutex
	Vreel model.VreelModel
}

type VreelLockStruct struct {
	cache map[string]VreelContainer
}

var VreelEditLock = VreelLockStruct{
	cache: make(map[string]VreelContainer),
}

func (lock *VreelLockStruct) GetVreel(id string) (model.VreelModel, bool) {
	// var vreel model.VreelModel
	val, ok := lock.cache[id]

	return val.Vreel, ok
}

func (lock *VreelLockStruct) SaveVreel(id string, v model.VreelModel) {
	//kill cached data in one minute after creation
	defer time.AfterFunc(time.Second*15, func() {
		delete(lock.cache, id)
	})

	mutex := lock.cache[id].M
	if mutex == nil {
		mutex = &sync.Mutex{}
	}
	lock.cache[id] = VreelContainer{
		M:     mutex,
		Vreel: v,
	}

}

//Handle Updating Elements
func (lock *VreelLockStruct) EditVreelElements(id string, exec func(model.VreelElements) (string, error)) error {
	// var err error
	defer func() {
		mutex, ok := lock.cache[id]
		if ok {
			mutex.M.Unlock()
		}
	}()

	vreel, ok := lock.GetVreel(id)
	if !ok {
		gErr := db.Where("id = ?", id).First(&vreel).Error
		if gErr == nil {
			lock.SaveVreel(id, vreel)
		} else {
			// err = gErr
		}

	}

	lock.cache[id].M.Lock()
	log.Println("locked mutex")
	elements := model.VreelElements{}
	json.Unmarshal([]byte(vreel.Elements), &elements)
	elStr, modifyErr := exec(elements)
	if modifyErr != nil {
		return modifyErr
	}
	updateErr := db.Model(model.VreelModel{}).Where("id = ?", id).Update("elements", elStr).Error
	if updateErr != nil {
		return updateErr
	}

	vreel.Elements = elStr

	lock.SaveVreel(id, vreel)
	return nil
}

func EditSocialLinks(vreelId, platform string, social model.Socials) error {
	editErr := VreelEditLock.EditVreelElements(vreelId, func(elements model.VreelElements) (string, error) {
		var err error
		socials := elements.Socials.Socials
		wasFound := false
		for idx, s := range socials {
			if s.Platform == platform {
				wasFound = true
				socials[idx] = &social
			}
		}
		if !wasFound {
			err = e.SOCIALSLINK_NOT_FOUND
		}

		elements.Socials.Socials = socials

		str, marshalErr := json.Marshal(elements)
		if marshalErr != nil {
			err = marshalErr
		}
		return string(str), err
	})
	return editErr
}

func EditSimpleLink(vreelId string, linkId string, newLink model.SimpleLink) error {

	editErr := VreelEditLock.EditVreelElements(vreelId, func(elements model.VreelElements) (string, error) {
		var err error
		simpleLinks := elements.SimpleLinks.Links
		wasFound := false
		for idx, link := range simpleLinks {
			if link.ID == linkId {
				simpleLinks[idx] = &newLink
				wasFound = true
				println(link)
			}
		}
		if !wasFound {
			err = e.SIMPLELINK_NOT_FOUND
		}
		elements.SimpleLinks.Links = simpleLinks
		str, marshalErr := json.Marshal(elements)
		if marshalErr != nil {
			err = e.FAILED_TO_SAVE
		}
		return string(str), err
	})

	return editErr
}

func CreateVreelFromModel(vreel model.VreelModel) error {
	return db.Create(&vreel).Error
}

//creates  when new account is created
func CreateNewVreel(author string) error {
	log.Println("[vreel] created")
	var err error
	buttonUri := "https://vreel.page"
	e := utils.GetDefaultElementsString()
	vreel := model.VreelModel{
		ID:        author,
		Author:    author,
		PageTitle: "Your Vreel",
		ButtonURI: &buttonUri,
		Elements:  e,
	}
	cErr := db.Create(&vreel).Error

	if cErr != nil {
		err = cErr
	}

	return err

}

func GetVreels(ids []string) *[]*model.Vreel {
	wg := sync.WaitGroup{}
	var vreels []*model.Vreel = []*model.Vreel{}
	for _, id := range ids {
		o := id
		wg.Add(1)
		go func() {
			defer wg.Done()
			vreel, err := GetVreel(o)
			if err == nil {
				vreels = append(vreels, &vreel)
			}
		}()
	}

	wg.Wait()

	return &vreels
}

func GetVreel(id string) (model.Vreel, error) {
	var vreel model.VreelModel
	var r model.Vreel
	var err error

	if f := db.Model(&model.VreelModel{}).Where("id = ? ", id).First(&vreel).Error; f != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		wg := sync.WaitGroup{}
		fmt.Println(vreel.SimpleLinks)
		slides, slidesErr := GetSlides(vreel.Slides)
		wg.Add(4)
		l := []*model.SimpleLinksElement{}
		g := []*model.GalleryElement{}
		socials := []*model.SocialsElement{}
		embeds := []*model.EmbedElement{}
		go func() {
			defer wg.Done()
			l = GetAllSimpleLinksElements(id)
		}()
		go func() {
			defer wg.Done()

			g = GetAllGalleryElements(id)
		}()

		go func() {
			defer wg.Done()

			socials = GetAllSocialElements(id)
		}()

		go func() {
			defer wg.Done()

			embeds = GetAllEmbeds(id)
		}()

		wg.Wait()

		if slidesErr != nil {
			err = slidesErr
		} else {
			v, conversionErr := vreel.ToVreel(slides)
			if conversionErr != nil {
				err = conversionErr
			} else {

				r = v
				r.SimpleLinks = l
				r.Gallery = g
				r.Socials = socials
				r.Embed = embeds
			}

		}
	}
	return r, err
}

func UpdateVreelElements(id, elements string) error {
	log.Println("[vreel] created")
	var u model.UserModel
	err := db.Where("id = ? ", id).First(&u)

	return err.Error
}

func GetAllVreels() ([]model.VreelModel, error) {
	var v []model.VreelModel
	var err error
	return v, err
}

func VreelAddSlide(slideId, vreelId string) error {
	var err error
	vreel := model.VreelModel{}

	if getErr := db.Where("id = ? ", vreelId).First(&vreel).Error; getErr != nil {
		err = getErr
	} else {
		slides := vreel.Slides

		slides = append(slides, slideId)
		updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("slides", slides).Update("last_slide_edited", slideId).Update("time_last_edited", time.Now().Unix()).Error

		if updateErr != nil {
			err = updateErr
		}

	}

	return err
}
func VreelRemoveSlide(vreelId, slideId string) error {
	var err error
	v := model.VreelModel{}
	if findErr := db.Where("id = ?", vreelId).First(&v).Error; findErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		slides := v.Slides
		slides = utils.RemoveStringFromSlice(slides, slideId)
		if updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("slides", slides).Update("last_slide_edited", slides[len(slides)-1]).Update("time_last_edited", time.Now().Unix()).Error; updateErr != nil {
			err = e.FAILED_VREEL_UPDATE
		}
	}

	return err
}

//returns id to most recently edite / created slide
func GetLatestVreelSlideId(id string) (string, int, error) {
	vreel := model.VreelModel{}
	err := db.Model(model.VreelModel{}).Where("id = ?", id).Select("last_slide_edited", "time_last_edited").Find(&vreel).Error
	v, _ := vreel.ToVreel([]*model.Slide{})
	return *v.LastSlideEdited, vreel.TimeLastEdited, err
}

func AddSimpleLinkToVreel(vreelId string, newLink model.SimpleLink) error {
	var vreel model.VreelModel
	var elements model.VreelElements

	fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error

	if fetchErr != nil {
		return e.VREEL_NOT_FOUND
	}

	parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)

	if parseErr != nil {
		return errors.New("failed to parse")
	}
	newLink.ID = utils.GenerateId()
	if elements.SimpleLinks == nil {
		elements.SimpleLinks = &model.SimpleLinksElement{
			Links:  []*model.SimpleLink{},
			Header: "",
		}
	}
	links := elements.SimpleLinks.Links

	links = append(links, &newLink)

	elements.SimpleLinks.Links = links

	u, marshalErr := json.Marshal(&elements)
	if marshalErr == nil {
		return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(u)).Error
	} else {
		return marshalErr
	}

}

func AddSuperLinkToVreel(vreelId string, newLink model.SuperLink) error {
	var vreel model.VreelModel
	var elements model.VreelElements

	fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error

	if fetchErr != nil {
		return e.VREEL_NOT_FOUND
	}

	parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)

	if parseErr != nil {
		return errors.New("failed to parse")
	}
	newLink.ID = utils.GenerateId()
	links := elements.SuperLinks

	links = append(links, &newLink)

	elements.SuperLinks = links

	u, marshalErr := json.Marshal(&elements)
	if marshalErr == nil {
		return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(u)).Error
	} else {
		return marshalErr
	}

}

func AddSocialsLink(vreelId string, input model.SocialsInput) error {
	var vreel model.VreelModel
	var elements model.VreelElements
	var socials []*model.Socials

	fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error

	if fetchErr != nil {
		return e.VREEL_NOT_FOUND
	}

	parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)

	if parseErr != nil {
		return errors.New("failed to parse")
	}
	if elements.Socials == nil {
		elements.Socials = &model.SocialsElement{Header: "", Socials: []*model.Socials{}}
	}
	socials = elements.Socials.Socials

	newSocial := model.Socials{Platform: *input.Platform, Username: *input.Username}
	socials = append(socials, &newSocial)

	elements.Socials.Socials = socials
	u, marshalErr := json.Marshal(&elements)
	if marshalErr == nil {
		return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(u)).Error
	} else {
		return marshalErr
	}
}

func AddImageToVreelGallery(vreelId string, input model.AddGalleryImageInput) error {
	var vreel model.VreelModel
	var err error
	var elements model.VreelElements
	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr == nil {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			return parseErr
		}
		galleryImages := elements.Gallery
		// galleryImages.Images = append(galleryImages.Images, &model.GalleryImage{
		// 	ID:          utils.GenerateId(),
		// 	Position:    input.Position,
		// 	Cta1:        (*model.Cta)(input.Cta1),
		// 	Cta2:        (*model.Cta)(input.Cta2),
		// 	ImageHeader: *input.ImageHeader,
		// 	Description: *input.Description,
		// 	Desktop:     (*model.Content)(input.Desktop),
		// 	Mobile:      (*model.Content)(input.Mobile),
		// })

		elements.Gallery = galleryImages

		v, marshalErr := json.Marshal(&elements)

		if marshalErr != nil {
			return marshalErr
		} else {
			return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error
		}

	}

	return err
}

func RemoveImageFromGallery(vreelId string, imageId string) error {
	// var vreel model.VreelModel
	var err error
	// var elements model.VreelElements
	// if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr == nil {
	// 	parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
	// 	if parseErr != nil {
	// 		return parseErr
	// 	}

	// 	// images := elements.Gallery.Images
	// 	imgWasFound := false

	// 	for idx, image := range images {
	// 		if image.ID == imageId {
	// 			imgWasFound = true
	// 			images = append(images[:idx], images[idx+1:]...)
	// 			break
	// 		}
	// 	}
	// 	if !imgWasFound {
	// 		err = errors.New("gallery image: " + imageId + " not found")
	// 	} else {
	// 		// elements.Gallery.Images = images
	// 		v, marshalErr := json.Marshal(&elements)
	// 		if marshalErr == nil {
	// 			return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error
	// 		} else {
	// 			return marshalErr
	// 		}
	// 	}
	// }

	return err
}

func AddVideoToVreel(vreelId string, video model.Video) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}

		videos := elements.Videos

		video.ID = utils.GenerateId()
		videos.Videos = append(videos.Videos, &video)

		elements.Videos = videos

		v, marshalErr := json.Marshal(&elements)

		if marshalErr != nil {
			err = marshalErr
			return err
		}
		updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

		if updateErr != nil {
			err = updateErr
		}

	}

	return err
}

func RemoveVideoFromVreel(vreelId, videoId string) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}
		videos := elements.Videos.Videos

		videoWasFound := false
		for idx, video := range videos {
			if video.ID == videoId {
				videoWasFound = true
				videos = append(videos[:idx], videos[idx+1:]...)
				break
			}
		}

		if !videoWasFound {
			err = errors.New("video: " + videoId + "not found")
		} else {
			elements.Videos.Videos = videos
			v, marshalErr := json.Marshal(&elements)

			if marshalErr != nil {
				err = marshalErr
				return err
			}
			updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

			if updateErr != nil {
				err = updateErr
			}
		}

	}

	return err

}

func AddContributionLink(vreelId string, input model.ContributionsInput) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}
		c := model.Contribution{
			ID:       utils.GenerateId(),
			Link:     input.Link,
			Platform: input.Platform,
		}
		if elements.Contributions == nil {
			elements.Contributions = &model.ContributionsElement{Header: "", Contributions: []*model.Contribution{}}
		}
		contributions := elements.Contributions.Contributions

		contributions = append(contributions, &c)
		elements.Contributions.Contributions = contributions
		v, marshalErr := json.Marshal(&elements)

		if marshalErr != nil {
			err = marshalErr
			return err
		}
		updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

		if updateErr != nil {
			err = updateErr
		}

	}

	return err
}

func RemoveContributionLink(vreelId, contributionLinkId string) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}

		contributions := elements.Contributions.Contributions
		linkWasFound := false

		for idx, c := range contributions {
			if c.ID == contributionLinkId {
				contributions = append(contributions[:idx], contributions[idx+1:]...)
				linkWasFound = true
				break

			}
		}

		if !linkWasFound {
			err = errors.New("contribution: " + " not found")
		} else {
			elements.Contributions.Contributions = contributions
			v, marshalErr := json.Marshal(&elements)

			if marshalErr != nil {
				err = marshalErr
				return err
			}
			updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

			if updateErr != nil {
				err = updateErr
			}

		}

	}

	return err
}

func AddMusicLink(vreelId string, input model.MusicInput) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}
		if elements.Music == nil {
			elements.Music = &model.MusicElement{Header: "", Music: []*model.Music{}}
		}
		m := model.Music{
			ID:       utils.GenerateId(),
			Platform: input.Platform,
			Link:     input.Link,
		}
		music := elements.Music.Music

		music = append(music, &m)

		elements.Music.Music = music

		v, marshalErr := json.Marshal(&elements)

		if marshalErr != nil {
			err = marshalErr
			return err
		}
		updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

		if updateErr != nil {
			err = updateErr
		}

	}

	return err

}

func RemoveMusicLink(vreelId, musicLinkId string) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}
		music := elements.Music.Music
		linkWasFound := false

		for idx, link := range music {
			if link.ID == musicLinkId {
				music = append(music[:idx], music[idx+1:]...)
				linkWasFound = true
				break
			}
		}
		if !linkWasFound {
			err = errors.New("music link not:  " + musicLinkId + " not found.")
		} else {
			elements.Music.Music = music
			v, marshalErr := json.Marshal(&elements)

			if marshalErr != nil {
				err = marshalErr
				return err
			}
			updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

			if updateErr != nil {
				err = updateErr
			}
		}
	}

	return err

}

func ResetUserEmployee(vreelId string) error {
	elements := utils.GetDefaultElementsString()
	updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", elements).Error

	return updateErr
}

func GetVreelSlideCount(vreelId string) (int, error) {
	var vreel model.VreelModel
	var err error
	count := 0
	if fetchErr := db.Where("id = ?", vreelId).Select("slides").First(&vreel).Error; err == nil {
		count = len(vreel.Slides)
	} else {
		err = fetchErr
	}

	return count, err

}

//needs optimization
// func EditElementPosition(vreelId, element string, position int) error {
// 	var err error
// 	var vreel model.VreelModel
// 	var elements model.VreelElements

// 	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
// 		err = e.VREEL_NOT_FOUND
// 	} else {
// 		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
// 		if parseErr != nil {
// 			err = parseErr
// 			return err
// 		}
// 		// links, photos, videos, socials
// 		switch element {
// 		case "simple_links":
// 			elements.SimpleLinks.Position = position

// 		case "socials":
// 			elements.Socials.Position = position

// 		case "gallery":
// 			elements.Gallery.Position = position

// 		case "videos":
// 			elements.Videos.Position = position

// 		default:
// 			err = errors.New("invalid element: " + element)
// 		}
// 		if err == nil {
// 			v, marshalErr := json.Marshal(&elements)

// 			if marshalErr != nil {
// 				err = marshalErr
// 				return err
// 			}
// 			updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

// 			if updateErr != nil {
// 				err = updateErr
// 			}
// 		}
// 	}

// 	return err
// }

func EditVreelLogo(vreelId, uri string) error {
	return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("logo_uri", uri).Error
}

func SetElementIsHidden(vreelId string, element string, state bool) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}

		switch element {
		case "simple_links":
			elements.SimpleLinks.Hidden = state

		case "socials":
			elements.Socials.Hidden = state

		// case "gallery":
		// 	elements.Gallery.Hidden = state

		case "videos":
			elements.Videos.Hidden = state

		default:
			err = errors.New("invalid element: " + element)
		}

		if err == nil {
			v, marshalErr := json.Marshal(&elements)

			if marshalErr != nil {
				err = marshalErr
				return err
			}
			updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

			if updateErr != nil {
				err = updateErr
			}
		}

	}

	return err

}

func RemoveSocialLink(vreelId, platform string) error {
	var err error
	var vreel model.VreelModel
	var elements model.VreelElements

	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			err = parseErr
			return err
		}
		socials := elements.Socials.Socials
		linkWasFound := false

		for idx, link := range socials {
			if link.Platform == platform {
				socials = append(socials[:idx], socials[idx+1:]...)
				linkWasFound = true
				break
			}
		}
		if !linkWasFound {
			err = errors.New("platform:  " + platform + " not found.")
		} else {
			elements.Socials.Socials = socials
			v, marshalErr := json.Marshal(&elements)

			if marshalErr != nil {
				err = marshalErr
				return err
			}
			updateErr := db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error

			if updateErr != nil {
				err = updateErr
			}
		}
	}

	return err
}

func UpdateVreelFields(vreelId string, fields []*model.VreelFields) error {
	var vreel_fields []string = []string{"display_options/background_audio",
		"display_options/default_logo",
		"display_options/slides/title/family",
		"display_options/slides/title/uri",
		"display_options/slides/button/uri",
		"display_options/slides/button/family",
		"display_options/slides/description/family",
		"display_options/slides/description/uri",
		"display_options/sections/title/family",
		"display_options/sections/title/uri",
		"display_options/sections/button/uri",
		"display_options/sections/button/family",
		"display_options/sections/description/family",
		"display_options/sections/description/uri",
		"display_options/sections/header/family",
		"display_options/sections/header/uri",
	}
	var err error

	//mutate display options on a vreel
	mutDisplayOptions := func(field string, value string) (string, error) {
		var err error
		var displayOptions string
		vreel := model.VreelModel{}
		getErr := db.Where("id = ?", vreelId).Select("display_options").First(&vreel).Error

		if getErr != nil {
			err = getErr

			return displayOptions, err
		}
		// fonts := model.Font{URI: "", Family: ""}
		d := model.DisplayOptions{
			BackgroundAudio: "",
			DefaultLogo:     "",
			Slide:           &model.SlideDisplayOptions{Title: &model.Font{}, Description: &model.Font{}, Button: &model.Font{}},
			Sections:        &model.SectionDisplayOptions{Header: &model.Font{}, Description: &model.Font{}, Title: &model.Font{}, Button: &model.Font{}},
		}
		if vreel.DisplayOptions != "" {
			unmarshalErr := json.Unmarshal([]byte(vreel.DisplayOptions), &d)
			if unmarshalErr != nil {
				err = unmarshalErr

				return displayOptions, err
			}
		}
		fmt.Println("displsy string", vreel.DisplayOptions)

		switch field {
		case "background_audio":
			d.BackgroundAudio = value
			break
		case "default_logo":
			d.DefaultLogo = value
			break
		case "slides/title/uri":
			fmt.Println("d", d)
			d.Slide.Title.URI = value
			break
		case "slides/title/family":
			fmt.Println("d", d)
			d.Slide.Title.Family = value
			break
		case "slides/button/family":
			fmt.Println("d", d)
			d.Slide.Button.Family = value
			break
		case "slides/button/uri":
			fmt.Println("d", d)
			d.Slide.Button.URI = value
			break
		case "slides/description/uri":
			fmt.Println("d", d)
			d.Slide.Description.URI = value
			break
		case "slides/description/family":
			fmt.Println("d", d)
			d.Slide.Description.Family = value
			break
		case "sections/title/uri":
			fmt.Println("d", d)
			d.Sections.Title.URI = value
			break
		case "sections/title/family":
			fmt.Println("d", d)
			d.Sections.Title.Family = value
			break
		case "sections/button/family":
			fmt.Println("d", d)
			d.Sections.Button.Family = value
			break
		case "sections/button/uri":
			fmt.Println("d", d)
			d.Sections.Button.URI = value
			break
		case "sections/description/uri":
			fmt.Println("d", d)
			d.Sections.Description.URI = value
			break
		case "sections/description/family":
			fmt.Println("d", d)
			d.Sections.Description.Family = value
			break
		case "sections/header/family":
			d.Sections.Header.Family = value
		case "sections/header/uri":
			d.Sections.Header.URI = value
		default:
			err = errors.New("invalid display option key")

		}
		if err != nil {
			return displayOptions, err
		}
		data, marshalErr := json.Marshal(d)
		if marshalErr != nil {
			fmt.Println("failed!")
			err = marshalErr
		} else {
			displayOptions = string(data)
		}
		return displayOptions, err
	}

	for idx := range fields {
		field := fields[idx]
		if utils.ItemExistsInStringSlice(field.Field, vreel_fields) {
			var key string
			var value string
			switch field.Field {
			case "display_options/background_audio":
				key = "display_options"
				options, e := mutDisplayOptions("background_audio", field.Value)
				if e != nil {
					return e
				}
				value = options
				break
			case "display_options/default_logo":
				key = "display_options"
				options, e := mutDisplayOptions("default_logo", field.Value)
				if e != nil {
					return e
				}
				value = options
				break
			case "display_options/slides/title/uri":
				key = "display_options"
				options, e := mutDisplayOptions("slides/title/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/slides/title/family":
				key = "display_options"
				options, e := mutDisplayOptions("slides/title/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/slides/button/uri":
				key = "display_options"
				options, e := mutDisplayOptions("slides/button/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break

			case "display_options/slides/button/family":
				key = "display_options"
				options, e := mutDisplayOptions("slides/button/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/slides/description/family":
				key = "display_options"
				options, e := mutDisplayOptions("slides/description/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/slides/description/uri":
				key = "display_options"
				options, e := mutDisplayOptions("slides/description/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/title/uri":
				key = "display_options"
				options, e := mutDisplayOptions("sections/title/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/title/family":
				key = "display_options"
				options, e := mutDisplayOptions("sections/title/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/button/uri":
				key = "display_options"
				options, e := mutDisplayOptions("sections/button/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break

			case "display_options/sections/button/family":
				key = "display_options"
				options, e := mutDisplayOptions("sections/button/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/description/family":
				key = "display_options"
				options, e := mutDisplayOptions("sections/description/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/description/uri":
				key = "display_options"
				options, e := mutDisplayOptions("sections/description/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/header/uri":
				key = "display_options"
				options, e := mutDisplayOptions("sections/header/uri", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			case "display_options/sections/header/family":
				key = "display_options"
				options, e := mutDisplayOptions("sections/header/family", field.Value)
				if e != nil {
					err = e
					return e
				}
				value = options
				break
			default:
				err = errors.New("key doesnt exist")
			}
			updateErr := db.Model(&model.VreelModel{}).Where("id = ?", vreelId).Update(key, value).Error
			if updateErr != nil {
				err = updateErr
			}
		} else {
			err = errors.New(fmt.Sprintf("field %v doesnt exist on vreel model", field.Field))
			continue
		}
	}

	return err
}
