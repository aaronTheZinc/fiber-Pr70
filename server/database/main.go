package database

import (
	"log"

	"github.com/vreel/app/graph/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db, db_init_err = databaseInit()

func databaseInit() (*gorm.DB, error) {
	return gorm.Open(postgres.New(postgres.Config{
		DSN:                  "host=localhost user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=Asia/Shanghai", // data source name, refer https://github.com/jackc/pgx
		PreferSimpleProtocol: true,                                                                                                  // disables implicit prepared statement usage. By default pgx automatically uses the extended protocol
	}), &gorm.Config{})

}

func Migrate() {
	log.Println("Migrating...")
	db.AutoMigrate(model.UserModel{})
	db.AutoMigrate(model.GroupModel{})
	// db.AutoMigrate(model.Group{})
}

// docker run --name vreel -e MYSQL_ROOT_PASSWORD=password -d mysql:tag
