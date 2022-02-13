package database

import (
	"log"

	"github.com/vreel/app/graph/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db, db_init_err = databaseInit()

func databaseInit() (*gorm.DB, error) {

	return gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
}

func Migrate() {
	log.Println("Migrating...")
	db.AutoMigrate(model.User{})
}

// docker run --name vreel -e MYSQL_ROOT_PASSWORD=password -d mysql:tag
