package database

import (
	"github.com/vreel/media/models"
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
	db.AutoMigrate(&models.File{})
}
