package database

import (
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateSlide(author string, s model.NewSlide) (model.Slide, error) {

	slide := s.ToDatabaseModel()

	slide.ID = utils.GenerateId()
	err := db.Save(&slide).Error
	if err != nil {
		return model.Slide{}, e.FAILED_SLIDE_CREATE
	}
	return slide.ToSlide(), err

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

func GetSlides(ids []string) ([]*model.Slide, error) {
	var err error
	var slides []*model.Slide

	for _, id := range ids {
		go func() {
			s, f := GetSlide(id)
			if f != nil {
				err = e.SLIDE_NOT_FOUND
			} else {
				slides = append(slides, &s)
			}
		}()
	}
	return slides, err
}
