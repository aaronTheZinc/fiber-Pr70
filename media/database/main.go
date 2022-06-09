package database

import (
	"os"

	"github.com/vreel/media/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db, db_init_err = databaseInit()

func databaseInit() (*gorm.DB, error) {
	var host string
	hostENV := os.Getenv("DB_HOST")
	if hostENV == "" {
		host = "localhost"
	} else {
		host = hostENV
	}
	return gorm.Open(postgres.New(postgres.Config{
		DSN:                  "host=" + host + " user=gorm password=gorm dbname=gorm port=5441 sslmode=disable TimeZone=Asia/Shanghai", // data source name, refer https://github.com/jackc/pgx
		PreferSimpleProtocol: true,                                                                                                     // disables implicit prepared statement usage. By default pgx automatically uses the extended protocol
	}), &gorm.Config{})

}

func Migrate() {
	db.AutoMigrate(models.File{})
}
