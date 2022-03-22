package database

import (
	"errors"

	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

//creates  when new account is created
func CreateNewVreel(author string) error {
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
	var u model.UserModel
	err := db.Where("id = ? ", id).First(&u)

	return err.Error
}

func GetAllVreels() ([]model.VreelModel, error) {
	var v []model.VreelModel
	var err error
	return v, err
}

//create a function called CreateVreel that accepts a title as a string and saves to gorm database
