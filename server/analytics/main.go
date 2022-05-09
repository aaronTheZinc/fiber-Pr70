package analytics

import (
	"time"

	"github.com/vreel/app/graph/model"
)

const (
	QUATER_T = (time.Hour * 24) * 90
	DAY_T    = (time.Hour * 24)
	YEAR_T   = (QUATER_T * 4)
)

func GetAnalytics(id string) (model.Analytics, error) {
	likes, err := GetLikesToday(id)
	return model.Analytics{
		Likes: likes,
	}, err
}
