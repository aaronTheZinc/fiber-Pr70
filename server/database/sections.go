package database

import (
	"fmt"

	"github.com/lib/pq"
	"github.com/vreel/app/graph/model"
	"gorm.io/gorm"
)

func AppendRootVreelElementSlice(vreelId, row string, appendage []string) error {
	expression := fmt.Sprintf("array_cat(%v, ?)", row)
	err := db.Model(&model.VreelModel{}).Where("id = ?", vreelId).Update(row, gorm.Expr(expression, pq.Array(appendage))).Error

	return err
}

// func GetAllSimpleLinksElements(links []string) []*model.SimpleLinksElement {

// 	simpleLinks := []*model.SimpleLinksElement{}
// 	simpleLinksModels := []*model.SimpleLinksElementModel{}
// 	wg := sync.WaitGroup{}

// 	for idx := range links {
// 		id := links[idx]
// 		go func() {
// 			defer wg.Done()
// 			sWg := sync.WaitGroup{}
// 			link := model.SimpleLinksElementModel{}
// 			if err := db.Where("id = ?", id).First(link).Error; err == nil {
// 				sWg.Add(len(link.Links))
// 				simpleLinksModels := []*model.SimpleLink{}
// 				for idx := range link.Links {
// 					simpleLinkId := link.Links[idx]
// 					go func() {
// 						defer sWg.Done()
// 						simpleLink := model.SimpleLinkModel{}
// 						if err := db.Where("id = ?", simpleLinkId).First(&simpleLink).Error; err == nil {
// 							l := simpleLink.ToSimpleLink()
// 							simpleLinksModels = append(simpleLinksModels, &l)
// 						}
// 					}()

// 					sWg.Done()
// 				}
// 			}

// 			return
// 		}()
// 	}
// 	wg.Wait()

// 	return simpleLinks
// }

// //Create SimpleLink
// func CreateSimpleLinkElement(vreelId string) (string, error) {
// 	id := utils.GenerateId()
// 	createErr := db.Create(&model.SimpleLinksElementModel{
// 		ID:       id,
// 		Header:   "Simple Links",
// 		Hidden:   false,
// 		Position: 0,
// 		Links:    []model.SimpleLinkModel{},
// 	}).Error

// 	if createErr != nil {
// 		return "", createErr
// 	}

// 	err := AppendRootVreelElementSlice(vreelId, "simple_links", []string{id})
// 	log.Println("appendage err", err)
// 	return id, err
// }

func EditSimpleLinkContent() {

}

func DeleteSimpleLinkElement() {

}

func DeleteSimpleLink() {

}
