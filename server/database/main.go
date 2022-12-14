package database

import (
	"log"

	"time"

	"github.com/vreel/app/graph/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db, db_init_err = databaseInit()

func databaseInit() (*gorm.DB, error) {
	// var host string
	// hostENV := "localhost"
	// if hostENV == "" {
	// 	host = "localhost"
	// } else {
	// 	host = hostENV
	// }
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "postgresql://postgres:RcQS7pWqzzPyIdxPHvpl@containers-us-west-49.railway.app:5922/railway", // data source name, refer https://github.com/jackc/pgx
		PreferSimpleProtocol: true,                                                                                        // disables implicit prepared statement usage. By default pgx automatically uses the extended protocol
	}), &gorm.Config{})

	if err != nil {
		time.Sleep(5 * time.Second)
		databaseInit()
	}

	return db, err
}

func IsConnected() bool {
	return !(db == nil)
}

func Migrate() {
	log.Println("Migrating...")

	db.AutoMigrate(model.GalleryElementModel{})
	db.AutoMigrate(model.GalleryImageModel{})
	db.AutoMigrate(model.SimpleLinksElementModel{})
	db.AutoMigrate(model.SimpleLinkModel{})
	db.AutoMigrate(model.UserModel{})
	db.AutoMigrate(model.VideoGalleryElementModel{})
	db.AutoMigrate(model.VideoModel{})
	db.AutoMigrate(model.GroupModel{})
	db.AutoMigrate(model.EventModel{})
	db.AutoMigrate(model.VreelModel{})
	db.AutoMigrate(model.SlideModel{})
	db.AutoMigrate(model.SocialsModel{})
	db.AutoMigrate(model.SocialElementModel{})
	db.AutoMigrate(model.AnalyticsFragmentModel{})
	db.AutoMigrate(model.AnalyticsModel{})
	db.AutoMigrate(model.EnterpriseModel{})
	db.AutoMigrate(model.EmbedElement{})
	// db.AutoMigrate(model.Group{})
	// 	data, _ := json.Marshal(&displayOptions)
	// 	db.Session(&gorm.Session{AllowGlobalUpdate: true}).Model(&model.VreelModel{}).Update("display_options", string(data))
}

// docker run --name vreel -e MYSQL_ROOT_PASSWORD=password -d mysql:tag
