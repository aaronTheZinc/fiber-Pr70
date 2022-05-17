package analytics

import (
	"time"

	"github.com/vreel/app/database"
)

//generates time markers to query
func GetQuaterlyLFollow(id string) (int, error) {
	currentTime := time.Now()
	minimumTime := currentTime.Add(-QUATER_T).Unix()

	return database.GetLikesFromMinimumTime(id, minimumTime)
}

// func GetFollowsToday(id string) (int, error) {

// }

// func GetThisYearFollow(id string) (int, error) {

// }
