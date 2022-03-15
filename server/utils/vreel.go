package utils

import (
	"encoding/json"

	"github.com/vreel/app/graph/model"
)

func GetDefaultElementsString() (string, error) {
	emptyString := ""
	f := false
	textArea := model.TextArea{
		Position: 1,
		Content:  emptyString,
		Hidden:   &f,
	}
	videos := model.Videos{
		Position: 2,
		URI:      emptyString,
		Tag:      emptyString,
		Hidden:   &f,
	}
	gallery := model.Gallery{
		Position: 3,
		Uris:     []string{},
		Tag:      emptyString,
		Hidden:   &f,
	}
	services := model.Service{
		Position: 4,
		Header:   textArea.Content,
		Hidden:   &f,
	}
	links := model.Links{
		Position: 5,
		Links:    []*model.Link{},
		Hidden:   &f,
	}
	contact := model.Contact{
		Position: 6,
		Header:   emptyString,
		Hidden:   &f,
	}

	elements := model.VreelElements{
		TextArea: &textArea,
		Videos:   &videos,
		Gallery:  &gallery,
		Services: &services,
		Links:    &links,
		Contact:  &contact,
	}

	o, err := json.Marshal(elements)

	return string(o), err
}
