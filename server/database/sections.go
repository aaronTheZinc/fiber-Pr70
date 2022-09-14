package database

import (
	"errors"
	"fmt"

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

func GetAllEmbeds(parent string) []*model.EmbedElement {
	var embeds []*model.EmbedElement
	embedModels := []model.EmbedElement{}

	db.Where("parent = ?", parent).Find(&embedModels)

	for _, m := range embedModels {
		embeds = append(embeds, &m)
	}

	return embeds
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
		db.Where("parent", m.ID).Find(&socialsModels)
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

func GetAllGalleryElements(parent string) []*model.GalleryElement {
	galleryElements := []*model.GalleryElement{}
	models := []model.GalleryElementModel{}

	db.Where("parent = ?", parent).Find(&models)

	for _, m := range models {
		slidesModels := []*model.SlideModel{}
		slides := []*model.Slide{}
		db.Where("parent", m.ID).Find(&slidesModels)
		for idx := range slidesModels {
			temp := slidesModels[idx].ToSlide()
			slides = append(slides, &temp)

		}
		el := m.ToGalleryElement()
		el.Slides = slides

		galleryElements = append(galleryElements, &el)

	}

	return galleryElements
}

func RemoveSimpleLink(linkId string) error {

	return db.Where("id = ?", linkId).Delete(&model.SimpleLinkModel{}).Error
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
		Position: FindNextActiveElementIndex(vreelId),
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
	err := db.Where("id = ?", elementId).Delete(&model.SimpleLinksElementModel{}).Error
	db.Where("parent = ?", elementId).Delete(&model.SimpleLinkModel{})
	return err
}

func CreateGalleryElement(vreelId string) (string, error) {
	id := utils.GenerateId()
	createErr := db.Create(&model.GalleryElementModel{
		ID:       id,
		Header:   "Gallery",
		Parent:   vreelId,
		Hidden:   false,
		Position: FindNextActiveElementIndex(vreelId),
		Slides:   []string{},
	}).Error

	if createErr != nil {
		return "", createErr
	}

	err := AppendToElementSlice(model.VreelModel{}, "gallery", vreelId, []string{id})

	return id, err
}

func AppendSlideToGallery(author, elementId string) (string, error) {
	var err error
	s, _ := CreateSlide(author, elementId)

	appendErr := AppendToElementSlice(&model.GalleryElementModel{}, "slides", elementId, []string{s.ID})
	if appendErr != nil {
		err = appendErr
	}
	return s.ID, err
}

func RemoveGalleryImage(slideId string) error {

	slide := model.GalleryImageModel{}
	getErr := db.Where("id = ?", slideId).First(&slide).Error
	if getErr != nil {
		return getErr
	}
	galleryWasFound := false
	element := model.GalleryElementModel{}
	getParentErr := db.Where("id = ?", slide.Parent).Select("slides").First(&element).Error

	if getParentErr != nil {
		return errors.New("failed to get link parent")
	}

	for idx, slide := range element.Slides {
		if slide == slideId {
			galleryWasFound = true
			element.Slides = append(element.Slides[:idx], element.Slides[idx+1:]...)
			break
		}
	}

	updateErr := db.Model(&model.GalleryElementModel{}).Where("id = ? ", slide.Parent).Update("slides", element.Slides).Error

	if updateErr != nil {
		return errors.New("failed to update gallery element")
	}

	if !galleryWasFound {
		return errors.New("image not found")
	}
	db.Where("id = ?", slideId).Delete(&model.SlideModel{})
	return nil
}
func DeleteGalleryElement(elementId string) error {
	var err error

	g := model.GalleryElementModel{}
	getErr := db.Where("id = ?", elementId).First(&g).Error
	if getErr != nil {
		err = errors.New("failed to find gallery element")
	}
	for idx := range g.Slides {
		DeleteSlide(g.Slides[idx])
	}
	deleteErr := db.Where("id = ?", elementId).Delete(&model.GalleryElementModel{}).Error

	if deleteErr != nil {
		err = errors.New("failed to delete gallery element")
	}
	return err
}

func DeleteEmbedElement(elementId string) error {
	return db.Where("id = ?", elementId).Delete(model.EmbedElement{}).Error
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
		Position: FindNextActiveElementIndex(vreelId),
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
		appendErr := AppendToElementSlice(&model.SocialElementModel{}, "socials", elementId, []string{id})
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

	updateErr := db.Model(&model.SocialElementModel{}).Where("id = ? ", social.Parent).Update("socials", element.Socials).Error

	if updateErr != nil {
		return errors.New("failed to update socials element")
	}

	if !socialLinkWasFound {
		return errors.New("social not found")
	}
	db.Where("id = ?", socialId).Delete(&model.SocialsModel{})
	return nil
}

func CreateEmbed(parent string) error {
	embed := model.EmbedElement{}
	embed.ID = utils.GenerateId()
	embed.Parent = parent
	embed.Header = "Embed"
	embed.Position = FindNextActiveElementIndex(parent)
	return db.Create(&embed).Error
}

func EditEmbed(elementId string, input model.AddEmbedInput) error {
	embed := input.ToEmbedElement()
	fmt.Println(elementId, embed)
	return db.Where("id = ?", elementId).Updates(&embed).Error
}

func DeleteSocialsElement(elementId string) error {
	var err error
	el := model.SocialElementModel{}
	if findErr := db.Where("id = ?", elementId).Select("parent").First(&el).Error; findErr == nil {
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
	db.Where("id = ?", elementId).Delete(&model.SocialElementModel{})
	return err
}

func FindNextActiveElementIndex(vreelId string) int {
	var simpleLinksCount int64 = 0
	var socialsCount int64 = 0
	var galleryCount int64 = 0
	var embedCount int64 = 0

	db.Model(&model.SimpleLinksElement{}).Where("parent = ?", vreelId).Count(&simpleLinksCount)
	db.Model(&model.SocialElementModel{}).Where("parent = ?", vreelId).Count(&socialsCount)
	db.Model(&model.GalleryElementModel{}).Where("parent = ?", vreelId).Count(&galleryCount)
	db.Model(&model.EmbedElement{}).Where("parent = ?", vreelId).Count(&embedCount)

	return int(simpleLinksCount+socialsCount+galleryCount+embedCount) + 1
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

func EditElementPosition(elementId, elementType string, position int) error {
	var err error
	updateEl := func(element interface{}) error {
		return db.Model(&element).Where("id = ?", elementId).Update("position", position).Error
	}
	switch elementType {
	case "simple_links":
		editErr := updateEl(model.SimpleLinksElementModel{})
		if editErr != nil {
			err = editErr
		}
	case "socials":
		editErr := updateEl(model.SocialElementModel{})
		if editErr != nil {
			err = editErr
		}
	case "gallery":
		editErr := updateEl(model.GalleryElementModel{})
		if editErr != nil {
			err = editErr
		}
	case "embed":
		editErr := updateEl(model.EmbedElement{})
		if editErr != nil {
			err = editErr
		}
	default:
		err = errors.New("element type doesnt exist")
	}

	return err
}

func EditElementHeader(elementId, elementType string, header string) error {
	var err error
	updateEl := func(element interface{}) error {
		return db.Model(&element).Where("id = ?", elementId).Update("header", header).Error
	}
	switch elementType {
	case "simple_links":
		editErr := updateEl(model.SimpleLinksElementModel{})
		if editErr != nil {
			err = editErr
		}
	case "socials":
		editErr := updateEl(model.SocialElementModel{})
		if editErr != nil {
			err = editErr
		}
	case "gallery":
		editErr := updateEl(model.GalleryElementModel{})
		if editErr != nil {
			err = editErr
		}
	case "embed":
		editErr := updateEl(model.EmbedElement{})
		if editErr != nil {
			err = editErr
		}
	default:
		err = errors.New("element type doesnt exist")
	}

	return err
}
