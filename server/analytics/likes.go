package analytics

import (
	"time"

	"github.com/vreel/app/database"
)

func GetQuaterlyLikes(id string) {

}

func GetLikesToday(id string) (int, error) {
	minimumTime := time.Now().Add(DAY_T).Unix()
	return database.GetLikesFromMinimumTime(id, minimumTime)

}

func GetThisYearLikes(id string) {

}
