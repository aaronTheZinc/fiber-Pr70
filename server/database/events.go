package database

import (
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func CreateEvent(author string, newEvent model.NewEvent) (model.Event, error) {
	event := newEvent.ToDatabaseModel()
	event.Author = author
	event.ID = utils.GenerateUID()

	err := db.Create(&event).Error

	return event.ToEvent(), err
}
