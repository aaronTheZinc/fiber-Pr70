package database

import (
	"github.com/vreel/media/models"
)

func GetUserFiles(id string) (models.UserFiles, error) {
	files := []models.File{}
	err := db.Where("author = ?", id).Find(&files).Error
	return models.UserFiles{Files: files}, err
}
