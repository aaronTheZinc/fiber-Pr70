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

//create a function called CreateVreel that accepts a title as a string and saves to gorm database

func AddLinkToVreel(vreelId string, newLink model.Link) error {
	var vreel model.VreelModel
	var elements model.VreelElements
	var links model.Links

	fetchErr := db.Where("id = ?", vreelId).First(&vreel).Error

	if fetchErr != nil {
		return e.VREEL_NOT_FOUND
	}

	parseErr := json.Unmarshal([]byte(vreel.Elements), &elements)

	if parseErr != nil {
		return errors.New("failed to parse")
	}
	links = *elements.Links
	links.Links = append(links.Links, &newLink)

	elements.Links = &links
	u, marshalErr := json.Marshal(&elements)
	if marshalErr == nil {
		log.Println("Hit!")
		return db.Model(model.VreelModel{}).Where("id = ?", vreelId).Update("elements", string(u)).Error
	} else {
		return marshalErr
	}

}
