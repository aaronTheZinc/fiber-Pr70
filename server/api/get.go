package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

var MediaServerEndpoint string = os.Getenv("MEDIA_SERVER_ENDPOINT")

type NewFolderRequest struct {
	FolderName string `json:"folder_name"`
}

type NewFolderResponse struct {
	TimeStamp string `json:"time_stamp"`
	Error     string `json:"error"`
}

func CreateNewFolder(fn string) error {
	var err error
	d := NewFolderRequest{
		FolderName: fn,
	}

	v, mErr := json.Marshal(d)
	if mErr != nil {
		err = errors.New("failed to marshal fodlder name")
	}
	resp, pErr := http.Post(MediaServerEndpoint, "application/json", bytes.NewBuffer(v))

	if pErr != nil {

	}

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, rErr := ioutil.ReadAll(resp.Body)

	if rErr != nil {
		err = errors.New("")
	}

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(body))

	return err

}
