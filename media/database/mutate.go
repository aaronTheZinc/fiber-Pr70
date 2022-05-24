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

func EditFileName(author, fileId, newName string) error {
	return db.Model(models.File{}).Where("file_id = ? AND author = ?", fileId, author).Update("file_name", newName).Error

}

func DeleteFile(userId, fileId string) error {
	return db.Where("file_id = ? AND author = ?", fileId, userId).Delete(&models.File{}).Error
}
