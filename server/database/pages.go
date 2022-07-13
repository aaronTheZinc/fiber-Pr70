package database

import (
	"github.com/lib/pq"
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreatePage(author string) error {
	var err error
	pageId := utils.GenerateId()
	buttonUri := "https://vreel.page"

	elements := utils.GetDefaultElementsString()
	createPageErr := CreateVreelFromModel(model.VreelModel{
		ID:        pageId,
		Author:    author,
		PageTitle: "Your Page",
		ButtonURI: &buttonUri,
		Elements:  elements,
	})

	if createPageErr != nil {
		return e.FAILED_CREATE_PAGE
	}
	var user model.UserModel
	findUserErr := db.Where("id = ?", author).Select("pages").First(&user).Error

	if findUserErr != nil {
		return e.USER_NOT_FOUND
	}

	pages := user.Pages

	pages = append(pages, pageId)

	updateErr := db.Model(&model.UserModel{}).Where("id = ?", author).Update("pages", pages).Error

	if updateErr != nil {
		return e.FAILED_USER_UPDATE
	}

	return err
}

func RemovePage(userId, pageId string) error {
	var user model.UserModel
	var err error
	if findUserErr := db.Where("id = ?", userId).First(&user).Error; findUserErr == nil {
		pages := user.Pages
		var updatedPages pq.StringArray
		if !utils.ItemExistsInStringSlice(userId, pages) {
			err = e.PAGE_NOT_FOUND
		}
		updatedPages = utils.RemoveStringFromSlice(pages, userId)

		updateErr := db.Model(&model.UserModel{}).Where("id = ?", userId).Select("pages", updatedPages).Error

		if updateErr != nil {
			err = e.FAILED_UPDATE_PAGES
		}

	} else {
		err = e.USER_NOT_FOUND
	}

	return err

}
