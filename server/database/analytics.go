package database

import (
	"time"

	"github.com/vreel/app/graph/model"
)

//field can be likes, follows, etc.
func GetAnalytics(id string) (model.AnalyticsModel, error) {
	var analytics model.AnalyticsModel
	err := db.Where("id = ?", id).First(&analytics).Error
	return analytics, err
}

func GetLikesFromMinimumTime(target string, minimumTime int64) (int, error) {
	var count int64

	err := db.Model(model.AnalyticsFragmentModel{}).Where("target = ?", target).Where("time_stamp", minimumTime).Count(&count).Error
	return int(count), err
}

func CheckIfHasBeenLiked(author, target string) (bool, error) {
	db.Where("target = ?", target).Where("author = ?", author).find
}

func CreateLike(author, target string) (model.AnalyticsFragmentModel, error) {
	like := model.AnalyticsFragmentModel{

		Author:    author,
		Target:    target,
		TimeStamp: time.Now().Unix(),
	}
	err := db.Create(&like).Error
	return like, err
}
