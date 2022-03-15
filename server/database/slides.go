package database

import (
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
)

func CreateSlide() {

}

func UpdateSlide() {

}

func GetSlide(id string) (model.Slide, error) {
	var slide model.Slide
	var err error

	getErr := db.Where("id = ?", id).First(&slide).Error

	if getErr != nil {
		err = e.SLIDE_NOT_FOUND
	}
	return slide, err

}
