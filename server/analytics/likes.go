package analytics

import (
	"time"

	"github.com/vreel/app/database"
)

func GetQuaterlyLikes(id string) (int, error) {
	minimumTime := time.Now().Add(-QUATER_T).Unix()
	return database.GetLikesFromMinimumTime(id, minimumTime)

}

func GetLikesToday(id string) (int, error) {
	minimumTime := time.Now().Add(-DAY_T).Unix()
	return database.GetLikesFromMinimumTime(id, minimumTime)

}

func GetThisYearLikes(id string) (int, error) {
	minimumTime := time.Now().Add(-YEAR_T).Unix()
	return database.GetLikesFromMinimumTime(id, minimumTime)

}
