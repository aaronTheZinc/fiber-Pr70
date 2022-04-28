package news

import (
	"sync"

	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
)

func CreateNewsFeed(userId string) ([]*model.Slide, error) {
	var err error
	var newsSlide []*model.Slide
	//contains last edited slide and time edited
	vreels := []model.Vreel{}
	if user, fetchErr := database.GetUser(userId); fetchErr == nil {
		followedVreels := user.Following
		wg := sync.WaitGroup{}
		for _, vreelId := range followedVreels {
			o := *vreelId
			wg.Add(1)
			go func() {
				defer wg.Done()
				if vreel, f := database.GetLatestVreelSlideId(o); f == nil {
					vreels = append(vreels, vreel)
				} else {
					err = f
				}

			}()
		}
		wg.Wait()
	} else {
		err = fetchErr
	}
	// database.GetSlides()
	return newsSlide, err
}

//bubble sort
// func SequenceSlides(model.Vreel) []model.Slide {
// 	var n = []int{1, 39, 2, 9, 7, 54, 11}

// 	var isDone = false

// 	for !isDone {
// 		isDone = true
// 		var i = 0
// 		for i < len(n)-1 {
// 			if n[i] > n[i+1] {
// 				n[i], n[i+1] = n[i+1], n[i]
// 				isDone = false
// 			}
// 			i++
// 		}
// 	}

// }
