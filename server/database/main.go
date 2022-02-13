package database

import (
	"log"

	"github.com/vreel/app/graph/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db, db_init_err = databaseInit()

func databaseInit() (*gorm.DB, error) {
	dsn := "gorm:gorm@tcp(localhost:9910)/gorm?charset=utf8&parseTime=True&loc=Local"
	connection, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Panic(err)
	}
	return connection, err

}

func Migrate() {
	log.Println("Migrating...")
	db.AutoMigrate(model.User{})
}

// docker run --name vreel -e MYSQL_ROOT_PASSWORD=password -d mysql:tag
