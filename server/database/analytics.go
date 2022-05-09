package database

import (
	"time"

	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func GetAnalyticsFragment(id string) (model.AnalyticFragment, error) {
	var fragment model.AnalyticsFragmentModel
	var err error
	if getErr := db.Where("id = ?", id).First(&fragment).Error; getErr != nil {
		err = e.ANALYTICS_FRAGMENT_NOT_FOUND
	}
	return fragment.ToAnalyticsFragment(), err
}

//field can be likes, follows, etc.
func GetAnalytics(id string) (model.AnalyticsModel, error) {
	var analytics model.AnalyticsModel
	err := db.Where("id = ?", id).First(&analytics).Error
	return analytics, err
}

func GetLikesFromMinimumTime(target string, minimumTime int64) (int, error) {
	var count int64
	err := db.Model(model.AnalyticsFragmentModel{}).Where("target = ? AND time_stamp > ? AND action = ?", target, minimumTime, "like").Count(&count).Error
	return int(count), err
}

func HasBeenLikedByAuthor(author, target string) (bool, error) {
	var count int64
	frag := model.AnalyticsFragmentModel{}

	err := db.Where("target = ? AND author = ?", target, author).Find(&frag).Count(&count).Error
	return count > 0, err
}

func CreateLike(author, target string) (model.AnalyticsFragmentModel, error) {
	var err error
	like := model.AnalyticsFragmentModel{
		ID:        utils.GenerateId(),
		Author:    author,
		Target:    target,
		Action:    "like",
		TimeStamp: time.Now().Unix(),
	}
	if creationErr := db.Create(&like).Error; creationErr != nil {
		err = e.FAILED_LIKE_CREATE
	}
	return like, err
}

func RemoveLike(author, target string) error {
	return db.Where("author = ? AND target = ? AND action = ?", author, target, "like").Delete(&model.AnalyticsFragmentModel{}).Error
}
