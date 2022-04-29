package news

import (
	"log"
	"sync"

	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
)

//used to structure slide and last edited time
type SlideFragment struct {
	Slide      model.Slide
	LastEdited int
}

type SlideFragments struct {
	Fragments []SlideFragment
}

//Sort Fragments and return Model.Slie (bubble sort)
func (f SlideFragments) Sort() []*model.Slide {
	isDone := false
	fragments := f.Fragments
	slides := []*model.Slide{}
	for !isDone {
		isDone = true
		var i = 0
		for i < len(fragments)-1 {
			if fragments[i].LastEdited > fragments[i+1].LastEdited {
				fragments[i], fragments[i+1] = fragments[i+1], fragments[i]
				isDone = false
			}
			i++
		}
	}
	for _, v := range fragments {
		o := &v.Slide
		slides = append(slides, o)
	}

	return slides

}

func CreateNewsFeed(userId string) ([]*model.Slide, error) {
	var err error
	//contains last edited slide and time edited
	fragments := SlideFragments{}
	if user, fetchErr := database.GetUser(userId); fetchErr == nil {
		followedVreels := user.Following
		wg := sync.WaitGroup{}
		for _, vreelId := range followedVreels {
			o := *vreelId
			wg.Add(1)
			go func() {
				defer wg.Done()
				if slideId, lastEditedTime, f := database.GetLatestVreelSlideId(o); f == nil {
					if slide, g := database.GetSlide(slideId); g == nil {
						fragments.Fragments = append(fragments.Fragments, SlideFragment{slide, lastEditedTime})

					} else {
						log.Printf("[Failed To Retrieve Slide]: %s ", slideId)
						return
					}

				} else {
					err = f
				}

			}()
		}
		wg.Wait()
	} else {
		err = fetchErr
	}
	// database.Getfragments()
	return fragments.Sort(), err
}
