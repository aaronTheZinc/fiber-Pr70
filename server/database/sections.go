package database

import (
	"errors"
	"fmt"
	"sync"

	"github.com/lib/pq"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
	"gorm.io/gorm"
)

func AppendToElementSlice(m interface{}, row, query string, appendage []string) error {
	expression := fmt.Sprintf("array_cat(%v, ?)", row)
	err := db.Model(&m).Where("id = ?", query).Update(row, gorm.Expr(expression, pq.Array(appendage))).Error

	return err
}

func GetAllSimpleLinksElements(parent string) []*model.SimpleLinksElement {
	simpleLinksElements := []*model.SimpleLinksElement{}
	models := []model.SimpleLinksElementModel{}

	db.Where("parent = ?", parent).Find(&models)

	for _, m := range models {
		linkModels := []model.SimpleLinkModel{}
		links := []*model.SimpleLink{}
		db.Where("parent", m.ID).Find(&linkModels)
		for idx := range linkModels {
			temp := linkModels[idx].ToSimpleLink()
			links = append(links, &temp)
		}
		el := m.ToSimpleLinksElement()
		el.Links = links

		simpleLinksElements = append(simpleLinksElements, &el)

	}
	return simpleLinksElements
}

func GetAllVideoGalleryElements(parent string) []*model.VideoGalleryElement {
	galleryElements := []*model.VideoGalleryElement{}
	models := []model.VideoGalleryElementModel{}

	db.Where("parent = ?", parent).Find(&models)

	for _, m := range models {
		videoModels := []model.VideoModel{}
		videos := []*model.Video{}
		db.Where("parent", m.ID).Find(&videoModels)
		for idx := range videoModels {
			temp := videoModels[idx].ToVideo()
			videos = append(videos, &temp)

		}
		el := m.ToVideoGalleryElement()
		el.Videos = videos

		galleryElements = append(galleryElements, &el)

	}
	return galleryElements
}

func GetAllSocialElements(parent string) []*model.SocialsElement {
	socialElements := []*model.SocialsElement{}
	models := []model.SocialElementModel{}

	db.Where("parent = ?", parent).Find(&models)

	for _, m := range models {
		socials := []*model.Socials{}
		socialsModels := []*model.SocialsModel{}
		db.Where("parent", m.ID).Find(&socials)
		for idx := range socialsModels {
			temp := socialsModels[idx].ToSocial()
			socials = append(socials, &temp)

		}
		el := m.ToSocialsElement()
		el.Socials = socials

		socialElements = append(socialElements, &el)

	}
	return socialElements
}

func GetAllGalleryElements(galleries []string) []*model.GalleryElement {
	galleryElements := []*model.GalleryElement{}
	wg := sync.WaitGroup{}
	wg.Add(len(galleries))
	for idx := range galleries {
		id := galleries[idx]
		go func() {
			defer wg.Done()
			sWg := sync.WaitGroup{}
			g := model.GalleryElementModel{}
			if err := db.Where("id = ?", id).First(&g).Error; err == nil {
				fmt.Println("found")
				element := g.ToGalleryElement()
				for idx := range g.Images {
					imageId := g.Images[idx]
					sWg.Add(len(g.Images))
					go func() {
						defer sWg.Done()
						image := model.GalleryImageModel{}
						if err := db.Where("id = ?", imageId).First(&image).Error; err == nil {
							i := image.ToGalleryImage()
							element.Images = append(element.Images, &i)
						}
					}()

				}
				sWg.Done()
				galleryElements = append(galleryElements, &element)
			}
		}()

	}

	wg.Wait()
	return galleryElements
}

func RemoveSimpleLink(linkId string) error {

	link := model.SimpleLinkModel{}
	getErr := db.Where("id = ?", linkId).First(&link).Error
	if getErr != nil {
		return getErr
	}
	linkWasFound := false
	element := model.SimpleLinksElementModel{}
	getParentErr := db.Where("id = ?", link.Parent).Select("links").First(&element).Error

	if getParentErr != nil {
		return errors.New("failed to get link parent")
	}

	for idx, link := range element.Links {
		if link == linkId {
			linkWasFound = true
			element.Links = append(element.Links[:idx], element.Links[idx+1:]...)
			break
		}
	}

	updateErr := db.Model(&model.SimpleLinksElementModel{}).Where("id = ? ", link.Parent).Update("links", element.Links).Error

	if updateErr != nil {
		return errors.New("failed to update simple links element")
	}

	if !linkWasFound {
		return errors.New("simple link not found")
	}

	return nil
}

func AppendSimpleLink(elementId string, input model.SimpleLinkInput) (string, error) {
	var err error
	id := utils.GenerateId()
	l := input.ToDatabaseModel()
	l.Parent = elementId
	l.ID = id
	if createErr := db.Create(&l).Error; createErr == nil {
		appendErr := AppendToElementSlice(&model.SimpleLinksElementModel{}, "links", elementId, []string{id})
		if appendErr != nil {
			err = appendErr
		}
	} else {
		err = createErr
	}
	return id, err
}

//Create SimpleLink
func CreateSimpleLinkElement(vreelId string) (string, error) {
	id := utils.GenerateId()
	createErr := db.Create(&model.SimpleLinksElementModel{
		ID:       id,
		Header:   "Simple Links",
		Parent:   vreelId,
		Hidden:   false,
		Position: 0,
		Links:    []string{},
	}).Error

	if createErr != nil {
		return "", createErr
	}

	err := AppendToElementSlice(model.VreelModel{}, "simple_links", vreelId, []string{id})

	return id, err
}

func EditSimpleLinkContent() {

}

func DeleteSimpleLinkElement(elementId string) error {
	var err error
	el := model.SimpleLinksElementModel{}
	if findErr := db.Where("id = ?", elementId).Select("Parent").First(&el).Error; findErr == nil {
		parent := el.Parent
		vreel := model.VreelModel{}
		db.Where("parent = ?", elementId).Delete(&model.SimpleLinkModel{})

		findVreelErr := db.Where("id = ?", parent).First(&vreel).Error
		if findVreelErr != nil {
			err = findVreelErr
		} else {
			linksEl := vreel.SimpleLinks
			linksPQArr := pq.StringArray{}
			linksPQArr = append(linksPQArr, utils.RemoveStringFromSlice(linksEl, elementId)...)
			updateErr := db.Model(&model.VreelModel{}).Where("id = ?", parent).Update("simple_links", linksPQArr).Error

			if updateErr != nil {
				err = updateErr
			}
		}
	} else {
		err = findErr
	}

	return err
}

func CreateGalleryElement(vreelId string) (string, error) {
	id := utils.GenerateId()
	createErr := db.Create(&model.GalleryElementModel{
		ID:       id,
		Header:   "Image Gallery",
		Parent:   vreelId,
		Hidden:   false,
		Position: 0,
		Images:   []string{},
	}).Error

	if createErr != nil {
		return "", createErr
	}

	err := AppendToElementSlice(model.VreelModel{}, "gallery", vreelId, []string{id})

	return id, err
}

func AppendImageToGallery(elementId string, image model.AddGalleryImageInput) (string, error) {
	var err error
	id := utils.GenerateId()
	l := image.ToDatabaseModel()
	l.Parent = elementId
	l.ID = id
	if createErr := db.Create(&l).Error; createErr == nil {
		appendErr := AppendToElementSlice(&model.GalleryElementModel{}, "images", elementId, []string{id})
		if appendErr != nil {
			err = appendErr
		}
	} else {
		err = createErr
	}
	return id, err
}

func RemoveGalleryImage(imageId string) error {

	image := model.GalleryImageModel{}
	getErr := db.Where("id = ?", imageId).First(&image).Error
	if getErr != nil {
		return getErr
	}
	galleryWasFound := false
	element := model.GalleryElementModel{}
	getParentErr := db.Where("id = ?", image.Parent).Select("images").First(&element).Error

	if getParentErr != nil {
		return errors.New("failed to get link parent")
	}

	for idx, image := range element.Images {
		if image == imageId {
			galleryWasFound = true
			element.Images = append(element.Images[:idx], element.Images[idx+1:]...)
			break
		}
	}

	updateErr := db.Model(&model.GalleryElementModel{}).Where("id = ? ", image.Parent).Update("images", element.Images).Error

	if updateErr != nil {
		return errors.New("failed to update gallery element")
	}

	if !galleryWasFound {
		return errors.New("image not found")
	}
	db.Where("id = ?", imageId).Delete(&model.GalleryImageModel{})
	return nil
}
func DeleteGalleryElement(elementId string) error {
	var err error
	el := model.GalleryElementModel{}
	if findErr := db.Where("id = ?", elementId).Select("Parent").First(&el).Error; findErr == nil {
		parent := el.Parent
		vreel := model.VreelModel{}
		db.Where("parent = ?", elementId).Delete(&model.GalleryImageModel{})

		findVreelErr := db.Where("id = ?", parent).First(&vreel).Error
		if findVreelErr != nil {
			err = findVreelErr
		} else {
			linksEl := vreel.Gallery
			linksPQArr := pq.StringArray{}
			linksPQArr = append(linksPQArr, utils.RemoveStringFromSlice(linksEl, elementId)...)
			updateErr := db.Model(&model.VreelModel{}).Where("id = ?", parent).Update("gallery", linksPQArr).Error

			if updateErr != nil {
				err = updateErr
			}
		}
	} else {
		err = findErr
	}

	return err
}

func CreateVideoGalleryElement(vreelId string) (string, error) {
	id := utils.GenerateId()
	createErr := db.Create(&model.VideoGalleryElementModel{
		ID:       id,
		Header:   "Video Gallery",
		Parent:   vreelId,
		Hidden:   false,
		Position: 0,
		Videos:   []string{},
	}).Error

	if createErr != nil {
		return "", createErr
	}

	err := AppendToElementSlice(model.VreelModel{}, "video_gallery", vreelId, []string{id})

	return id, err
}

func DeleteVideoGalleryElement(elementId string) error {
	var err error
	el := model.VideoGalleryElementModel{}
	if findErr := db.Where("id = ?", elementId).Select("Parent").First(&el).Error; findErr == nil {
		parent := el.Parent
		vreel := model.VreelModel{}
		db.Where("parent = ?", elementId).Delete(&model.VideoModel{})

		findVreelErr := db.Where("id = ?", parent).First(&vreel).Error
		if findVreelErr != nil {
			err = findVreelErr
		} else {
			linksEl := vreel.VideoGallery
			linksPQArr := pq.StringArray{}
			linksPQArr = append(linksPQArr, utils.RemoveStringFromSlice(linksEl, elementId)...)
			updateErr := db.Model(&model.VreelModel{}).Where("id = ?", parent).Update("video_gallery", linksPQArr).Error

			if updateErr != nil {
				err = updateErr
			}
		}
	} else {
		err = findErr
	}

	return err
}

func AppendVideoToVideoGallery(elementId string, video model.AddVideoInput) (string, error) {
	var err error
	id := utils.GenerateId()
	v := video.ToDatabaseModel()
	v.Parent = elementId
	v.ID = id
	if createErr := db.Create(&v).Error; createErr == nil {
		appendErr := AppendToElementSlice(&model.VideoGalleryElementModel{}, "videos", elementId, []string{id})
		if appendErr != nil {
			err = appendErr
		}
	} else {
		err = createErr
	}
	return id, err
}
func RemoveVideoFromVideoGallery(videoId string) error {

	image := model.VideoModel{}
	getErr := db.Where("id = ?", videoId).First(&image).Error
	if getErr != nil {
		return getErr
	}
	videoGalleryWasFound := false
	element := model.VideoGalleryElementModel{}
	getParentErr := db.Where("id = ?", image.Parent).Select("images").First(&element).Error

	if getParentErr != nil {
		return errors.New("failed to get link parent")
	}

	for idx, image := range element.Videos {
		if image == videoId {
			videoGalleryWasFound = true
			element.Videos = append(element.Videos[:idx], element.Videos[idx+1:]...)
			break
		}
	}

	updateErr := db.Model(&model.GalleryElementModel{}).Where("id = ? ", image.Parent).Update("videos", element.Videos).Error

	if updateErr != nil {
		return errors.New("failed to update video gallery element")
	}

	if !videoGalleryWasFound {
		return errors.New("video not found")
	}
	db.Where("id = ?", videoId).Delete(&model.VideoModel{})
	return nil
}

func CreateSocialsElement(vreelId string) (string, error) {
	id := utils.GenerateId()
	createErr := db.Create(&model.SocialElementModel{
		ID:       id,
		Header:   "Socials",
		Parent:   vreelId,
		Hidden:   false,
		Position: 0,
		Socials:  []string{},
	}).Error

	if createErr != nil {
		return "", createErr
	}

	err := AppendToElementSlice(model.VreelModel{}, "socials", vreelId, []string{id})

	return id, err
}

func AppendToSocialLinks(elementId string, video model.SocialsInput) (string, error) {
	var err error
	id := utils.GenerateId()
	v := video.ToDatabaseModel()
	v.Parent = elementId
	v.ID = id
	if createErr := db.Create(&v).Error; createErr == nil {
		appendErr := AppendToElementSlice(&model.VideoGalleryElementModel{}, "socials", elementId, []string{id})
		if appendErr != nil {
			err = appendErr
		}
	} else {
		err = createErr
	}
	return id, err
}
func RemoveSocialLinks(socialId string) error {

	social := model.SocialsModel{}
	getErr := db.Where("id = ?", socialId).First(&social).Error
	if getErr != nil {
		return getErr
	}
	socialLinkWasFound := false
	element := model.SocialElementModel{}
	getParentErr := db.Where("id = ?", social.Parent).Select("socials").First(&element).Error

	if getParentErr != nil {
		return errors.New("failed to get link parent")
	}

	for idx, image := range element.Socials {
		if image == socialId {
			socialLinkWasFound = true
			element.Socials = append(element.Socials[:idx], element.Socials[idx+1:]...)
			break
		}
	}

	updateErr := db.Model(&model.SocialElementModel{}).Where("id = ? ", social.Parent).Update("videos", element.Socials).Error

	if updateErr != nil {
		return errors.New("failed to update video gallery element")
	}

	if !socialLinkWasFound {
		return errors.New("social not found")
	}
	db.Where("id = ?", socialId).Delete(&model.VideoModel{})
	return nil
}

func DeleteSocialsElement(elementId string) error {
	var err error
	el := model.VideoGalleryElementModel{}
	if findErr := db.Where("id = ?", elementId).Select("Parent").First(&el).Error; findErr == nil {
		parent := el.Parent
		vreel := model.VreelModel{}
		db.Where("parent = ?", elementId).Delete(&model.SocialsModel{})

		findVreelErr := db.Where("id = ?", parent).First(&vreel).Error
		if findVreelErr != nil {
			err = findVreelErr
		} else {
			linksEl := vreel.Socials
			linksPQArr := pq.StringArray{}
			linksPQArr = append(linksPQArr, utils.RemoveStringFromSlice(linksEl, elementId)...)
			updateErr := db.Model(&model.VreelModel{}).Where("id = ?", parent).Update("socials", linksPQArr).Error

			if updateErr != nil {
				err = updateErr
			}
		}
	} else {
		err = findErr
	}

	return err
}

func UpdateSimpleLink(linkId string, input model.SimpleLinkInput) error {
	link := input.ToDatabaseModel()
	return db.Where("id = ?", linkId).Updates(&link).Error
}

func UpdateGalleryImage(imageId string, input model.AddGalleryImageInput) error {
	image := input.ToDatabaseModel()
	return db.Where("id = ?", imageId).Updates(&image).Error
}
func UpdateVideoGalleryImage(videoId string, input model.AddVideoInput) error {
	video := input.ToDatabaseModel()
	return db.Where("id = ?", videoId).Updates(&video).Error
}
func UpdateSocialsLinks(linkId string, input model.SocialsInput) error {
	link := input.ToDatabaseModel()
	return db.Where("id = ?", linkId).Updates(&link).Error
}
