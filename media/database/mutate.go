package database

import (
	"log"

	"github.com/vreel/media/models"
)

func CreateFile(file models.File) error {

	err := db.Create(&file).Error
	log.Println("Created File From Author", file.Author)
	if err != nil {
		log.Println(err.Error())
	}
	return err
}
