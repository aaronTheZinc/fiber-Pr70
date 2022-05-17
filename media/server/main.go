package server

import (
	"fmt"

	"github.com/tus/tusd/pkg/filestore"
	tusd "github.com/tus/tusd/pkg/handler"
)

var store = filestore.FileStore{
	Path: "./uploads",
}

var composer = tusd.NewStoreComposer()

func StartFileSever() *tusd.Handler {
	store := filestore.FileStore{
		Path: "./uploads",
	}
	composer := tusd.NewStoreComposer()
	store.UseIn(composer)
	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:              "/files/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})

	if err != nil {
		panic(fmt.Errorf("Unable to create handler: %s", err))
	}

	return handler
}
