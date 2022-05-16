package client

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/vreel/app/graph/model"
)

type NewFolderRequest struct {
	FolderName string `json:"folder_name"`
}

type NewFolderResponse struct {
	TimeStamp string `json:"time_stamp"`
	Error     string `json:"error"`
}

type UserFileResponse struct {
	Files []model.File `json:"files"`
}

func GetUsersFiles(id string) (model.Files, error) {
	var err error
	var files_r UserFileResponse
	var files model.Files
	endpoint := os.Getenv("MEDIA_SERVER_ENDPOINT") + "/files" + "?id=" + id
	fmt.Println(endpoint)
	if resp, getErr := http.Get(endpoint); getErr == nil {
		if body, e := ioutil.ReadAll(resp.Body); err != nil {
			err = e
			log.Print("[failed to get] ", e.Error())
		} else {

			if unmarshalErr := json.Unmarshal(body, &files_r); unmarshalErr != nil {
				err = errors.New("[failed to parse]" + unmarshalErr.Error())

			} else {
				fmt.Println("files-" + fmt.Sprintf("%v", files_r))
				for _, file := range files_r.Files {
					f := file
					f.URI = os.Getenv("MEDIA_SERVER_FILE_ENDPOINT") + "/" + file.URI
					files.Files = append(files.Files, &f)
				}
				files.FileCount = len(files_r.Files)
			}

		}
	} else {
		log.Println("[failed to get]: ", endpoint)
	}

	return files, err
}
