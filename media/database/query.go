package database

import (
	"github.com/vreel/media/models"
)

func GetUserFiles(id string) (*[]models.File, error) {
	files := []models.File{}
	err := db.Where("id = ?", id).Find(&files).Error
	return &files, err
}
