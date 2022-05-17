package database

import (
	"log"
	"os"
	"time"

	"github.com/vreel/app/graph/model"
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
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "host=" + host + " user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=Asia/Shanghai", // data source name, refer https://github.com/jackc/pgx
		PreferSimpleProtocol: true,                                                                                                     // disables implicit prepared statement usage. By default pgx automatically uses the extended protocol
	}), &gorm.Config{})

	if err != nil {
		time.Sleep(5 * time.Second)
		databaseInit()
	}

	return db, err
}

func IsConnected() bool {
	return db == nil
}

func Migrate() {
	log.Println("Migrating...")
	db.AutoMigrate(model.UserModel{})
	db.AutoMigrate(model.GroupModel{})
	db.AutoMigrate(model.EventModel{})
	db.AutoMigrate(model.VreelModel{})
	db.AutoMigrate(model.SlideModel{})
	db.AutoMigrate(model.AnalyticsFragmentModel{})
	db.AutoMigrate(model.AnalyticsModel{})
	db.AutoMigrate(model.EnterpriseModel{})
	// db.AutoMigrate(model.Group{})
}

// docker run --name vreel -e MYSQL_ROOT_PASSWORD=password -d mysql:tag
