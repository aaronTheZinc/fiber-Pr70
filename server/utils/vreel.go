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
		Videos:   []*model.Video{},
		Hidden:   f,
	}
	gallery := model.Gallery{
		Position: 3,
		Images:   []*model.GalleryImage{},
		Hidden:   f,
	}
	services := model.Service{
		Position: 4,
		Header:   textArea.Content,
		Hidden:   &f,
	}
	contact := model.Contact{
		Position: 6,
		Header:   emptyString,
		Hidden:   &f,
	}
	music := model.MusicElement{
		Header: "",
		Music:  []*model.Music{},
	}

	contributions := model.ContributionsElement{
		Header:        "",
		Contributions: []*model.Contribution{},
	}

	simpleLinks := model.SimpleLinksElement{
		Links:  []*model.SimpleLink{},
		Header: "",
	}
	elements := model.VreelElements{
		TextArea:    &textArea,
		Videos:      &videos,
		Gallery:     &gallery,
		Services:    &services,
		Music:       &music,
		SimpleLinks: &simpleLinks,
		Socials:     &model.SocialsElement{},
		// SimpleLinks: []*model.SimpleLink{},
		Contributions: &contributions,
		SuperLinks:    []*model.SuperLink{},
		Contact:       &contact,
	}

	o, err := json.Marshal(elements)

	return string(o), err
}
