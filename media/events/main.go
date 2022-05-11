package events

import (
	"fmt"
	"log"

	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/vreel/media/api"
	"github.com/vreel/media/database"
	"github.com/vreel/media/models"
	"github.com/vreel/media/server"
)

func HandleCompletedUpload(handler *tusd.Handler) {
	for {
		event := <-handler.CompleteUploads
		uploadId := event.Upload.ID

		f, _ := server.GetFileInfo(uploadId)
		log.Printf("%s", f.MetaData)
		tkn := event.HTTPRequest.Header.Get("token")
		if u, err := api.GetClientInfo(tkn); err == nil {
			file := models.File{
				Author: u.Id,
				FileId: uploadId,
			}
			database.CreateFile(file)
		}

		fmt.Printf("Upload %s finished\n", event.Upload.ID)
	}
}
