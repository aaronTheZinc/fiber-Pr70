package database

import (
	"log"
	"os"

	"github.com/vreel/media/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db, db_init_err = databaseInit()

func databaseInit() (*gorm.DB, error) {
	env := os.Getenv("env")
	host := "db"
	port := "5432"
	log.Println("connecting to db")
	if env == "dev" || env == "" {
		host = "localhost"
		port = "5433"
	}
	return gorm.Open(postgres.New(postgres.Config{
		DSN:                  "host=" + host + " user=gorm password=gorm dbname=gorm port=" + port + " sslmode=disable TimeZone=Asia/Shanghai", // data source name, refer https://github.com/jackc/pgx
		PreferSimpleProtocol: true,                                                                                                             // disables implicit prepared statement usage. By default pgx automatically uses the extended protocol
	}), &gorm.Config{})

}

func Migrate() {
	db.AutoMigrate(models.File{})
}
