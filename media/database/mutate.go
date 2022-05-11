package database

import "github.com/vreel/media/models"

func CreateFile(file models.File) error {

	err := db.Create(&file).Error

	return err
}
