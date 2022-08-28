package client

import (
	"bytes"
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

type FileEditResponse struct {
	FileId    string `json:"file_id"`
	Succeeded bool   `json:"succeeded"`
	Error     string `json:"error"`
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
		} else {

			if unmarshalErr := json.Unmarshal(body, &files_r); unmarshalErr != nil {
				err = errors.New("[failed to parse]" + unmarshalErr.Error())

			} else {
				fmt.Println("files-" + fmt.Sprintf("%v", files_r))
				for _, file := range files_r.Files {
					f := file
					// f.URI = os.Getenv("MEDIA_SERVER_FILE_ENDPOINT") + "/" + file.ID
					files.Files = append(files.Files, &f)
				}
				fmt.Println(files.Files)
				files.FileCount = len(files_r.Files)
			}

		}
	} else {
		log.Println("[failed to get]: ", endpoint)
	}

	return files, err
}

func EditFileName(userId, fileId, newName string) error {
	var err error
	endpoint := os.Getenv("MEDIA_SERVER_ENDPOINT") + "/files/filename/edit"
	values := map[string]string{"user_id": userId, "file_id": fileId, "new_file_name": newName}

	body, _ := json.Marshal(values)
	if resp, postErr := http.Post(endpoint, "application/json", bytes.NewBuffer(body)); postErr == nil {
		body, e := ioutil.ReadAll(resp.Body)
		if e != nil {
			err = e
			return err
		}
		r := FileEditResponse{}
		json.Unmarshal([]byte(body), &r)
		if !r.Succeeded {
			err = errors.New(r.Error)
			log.Println("failed to edit", r.Error)
			return err
		}
	} else {
		err = postErr
	}
	return err
}

func DeleteFile(userId, fileId string) error {
	var err error
	endpoint := os.Getenv("MEDIA_SERVER_ENDPOINT") + "/files/delete"
	values := map[string]string{"user_id": userId, "file_id": fileId}

	body, _ := json.Marshal(values)
	if resp, postErr := http.Post(endpoint, "application/json", bytes.NewBuffer(body)); postErr == nil {
		body, e := ioutil.ReadAll(resp.Body)
		if e != nil {
			err = e
			return err
		}
		r := FileEditResponse{}
		json.Unmarshal([]byte(body), &r)
		if !r.Succeeded {
			err = errors.New(r.Error)
			log.Println("failed to edit", r.Error)
			return err
		}
	} else {
		err = postErr
	}
	return err
}
