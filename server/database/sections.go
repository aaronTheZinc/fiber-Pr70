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

func GetAllSimpleLinksElements(links []string) []*model.SimpleLinksElement {
	fmt.Println("[links len]", links)
	simpleLinks := []*model.SimpleLinksElement{}
	simpleLinksModels := []*model.SimpleLinksElementModel{}
	wg := sync.WaitGroup{}

	for idx := range links {
		wg.Add(len(links))
		id := links[idx]
		element := model.SimpleLinksElement{}
		go func() {
			defer wg.Done()
			sWg := sync.WaitGroup{}
			link := model.SimpleLinksElementModel{}
			if err := db.Where("id = ?", id).First(&link).Error; err == nil {
				element = link.ToSimpleLinksElement()
				fmt.Println()
				sWg.Add(len(link.Links))
				//create sub routine for sub links
				for idx := range link.Links {
					simpleLinkId := link.Links[idx]
					go func() {
						defer sWg.Done()
						simpleLink := model.SimpleLinkModel{}
						if err := db.Where("id = ?", simpleLinkId).First(&simpleLink).Error; err == nil {
							l := simpleLink.ToSimpleLink()
							element.Links = append(element.Links, &l)
						}
					}()

				}
				simpleLinks = append(simpleLinks, &element)
			}
		}()
	}
	wg.Wait()

	for idx := range simpleLinksModels {
		m := simpleLinksModels[idx].ToSimpleLinksElement()
		simpleLinks = append(simpleLinks, &m)
	}

	return simpleLinks
}

func RemoveSimpleLink(linkId string) error {

	link := model.SimpleLinkModel{}
	getErr := db.Where("id = ?", linkId).First(&link).Error
	if getErr != nil {
		return getErr
	}
	linkWasFound := false
	element := model.SimpleLinksElementModel{}
	getParentErr := db.Where("id = ?", link.Parent).Select("links").First(&element)

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

	if updateErr == nil {
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
	if createErr := db.Save(&l).Error; createErr == nil {
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

func DeleteSimpleLinkElement() {

}

func DeleteSimpleLink() {

}
