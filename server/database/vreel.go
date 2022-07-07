package database

import (
	"encoding/json"
	"errors"
	"log"
	"time"

	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

//creates  when new account is created
func CreateNewVreel(author string) error {
	log.Println("[vreel] created")
	var err error
	buttonUri := "https://vreel.page"
	e, gErr := utils.GetDefaultElementsString()
	vreel := model.VreelModel{
		ID:        author,
		Author:    author,
		PageTitle: "Your Vreel",
		ButtonURI: &buttonUri,
		Elements:  e,
	}
	if gErr != nil {
		err = errors.New("failed to create vreel")
	}
	cErr := db.Create(&vreel).Error

	if cErr != nil {
		err = cErr
	}

	return err

}

func GetVreel(id string) (model.Vreel, error) {
	log.Println("id ->", id)
	var vreel model.VreelModel
	var r model.Vreel
	var err error
	if f := db.Where("id = ? ", id).First(&vreel).Error; f != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		slides, slidesErr := GetSlides(vreel.Slides)
		if slidesErr != nil {
			err = slidesErr
		} else {
			v, conversionErr := vreel.ToVreel(slides)
			if conversionErr != nil {
				err = conversionErr
			} else {
				r = v
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

func VreelAddSlide(slideId, userId string) error {
	var err error
	vreel := model.VreelModel{}

	if getErr := db.Where("id = ? ", userId).First(&vreel).Error; getErr != nil {
		err = getErr
	} else {
		slides := vreel.Slides

		slides = append(slides, slideId)
		updateErr := db.Model(model.VreelModel{}).Where("id = ?", userId).Update("slides", slides).Update("last_slide_edited", slideId).Update("time_last_edited", time.Now().Unix()).Error

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

func RemoveSimpleLink(vreelId, linkId string) error {
	var vreel model.VreelModel
	var err error
	var elements model.VreelElements
	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr == nil {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			return parseErr
		}
		links := elements.SimpleLinks.Links
		linkWasFound := false

		for idx, link := range links {
			if link.ID == linkId {
				linkWasFound = true
				links = append(links[:idx], links[idx+1:]...)
				break
			}
		}
		if !linkWasFound {
			err = errors.New("gallery image: " + linkId + " not found")
		} else {
			elements.SimpleLinks.Links = links
			v, marshalErr := json.Marshal(&elements)
			if marshalErr == nil {
				return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error
			} else {
				return marshalErr
			}
		}
	}
	return err
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

	newSocial := model.Socials{Platform: input.Platform, Username: input.Username}
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
		galleryImages.Images = append(galleryImages.Images, &model.GalleryImage{
			ID:          utils.GenerateId(),
			Position:    input.Position,
			Cta1:        (*model.Cta)(input.Cta1),
			Cta2:        (*model.Cta)(input.Cta2),
			ImageHeader: input.ImageHeader,
			Description: input.Description,
			Desktop:     (*model.Content)(input.Desktop),
			Mobile:      (*model.Content)(input.Mobile),
		})

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
	var vreel model.VreelModel
	var err error
	var elements model.VreelElements
	if fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error; fetchErr == nil {
		parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)
		if parseErr != nil {
			return parseErr
		}

		images := elements.Gallery.Images
		imgWasFound := false

		for idx, image := range images {
			if image.ID == imageId {
				imgWasFound = true
				images = append(images[:idx], images[idx+1:]...)
				break
			}
		}
		if !imgWasFound {
			err = errors.New("gallery image: " + imageId + " not found")
		} else {
			elements.Gallery.Images = images
			v, marshalErr := json.Marshal(&elements)
			if marshalErr == nil {
				return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(v)).Error
			} else {
				return marshalErr
			}
		}
	}

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
	elements, _ := utils.GetDefaultElementsString()
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
func EditElementPosition(vreelId, element string, position int) error {
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
		// links, photos, videos, socials
		switch element {
		case "simple_links":
			elements.SimpleLinks.Position = position

		case "socials":
			elements.Socials.Position = position

		case "gallery":
			elements.Gallery.Position = position

		case "videos":
			elements.Videos.Position = position

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

		case "gallery":
			elements.Gallery.Hidden = state

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
