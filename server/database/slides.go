package database

import (
	"encoding/json"
	"log"
	"sync"
	"time"

	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateSlide(author string) (model.Slide, error) {

	slide := model.CreateNewSlideModel()
	slide.Author = author
	slide.ID = utils.GenerateId()
	md := model.SlideMetaData{}
	md.Created = time.Now().UTC().String()
	md.Size = "0"

	v, _ := json.Marshal(md)
	slide.Metadata = string(v)
	err := db.Create(&slide).Error
	if err != nil {
		return model.Slide{}, e.FAILED_SLIDE_CREATE
	}
	return slide.ToSlide(), err

}

func UpdateSlide(id string, slide model.SlideModel) (model.Slide, error) {
	log.Printf("[Updated Slide %s]: %s", id, slide)
	err := db.Where("id = ?", id).Updates(&slide).Error
	if err != nil {
		log.Panic(err)
	}
	return slide.ToSlide(), err
}

func GetSlide(id string) (model.Slide, error) {
	var slide model.SlideModel
	var err error

	getErr := db.Where("id = ?", id).First(&slide).Error

	if getErr != nil {
		err = e.SLIDE_NOT_FOUND
	}
	return slide.ToSlide(), err

}

func GetSlides(ids []string) ([]*model.Slide, error) {
	var err error
	var slides []*model.Slide
	var wg sync.WaitGroup
	for _, id := range ids {
		o := id
		wg.Add(1)
		go func() {
			defer wg.Done()
			s, f := GetSlide(o)
			if f != nil {
				err = e.SLIDE_NOT_FOUND
			} else {
				slides = append(slides, &s)
			}
		}()
	}
	wg.Wait()
	return slides, err
}

func DeleteSlide(id string) error {
	err := db.Where("id = ?", id).Delete(&model.SlideModel{}).Error

	return err
}
