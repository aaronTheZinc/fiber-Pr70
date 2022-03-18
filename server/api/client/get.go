package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type NewFolderRequest struct {
	FolderName string `json:"folder_name"`
}

type NewFolderResponse struct {
	TimeStamp string `json:"time_stamp"`
	Error     string `json:"error"`
}

func CreateNewFolder(fn string) error {
	var MediaServerEndpoint string = os.Getenv("MEDIA_SERVER_ENDPOINT")
	ep := MediaServerEndpoint + "/files" + "/new_folder"
	fmt.Println(ep)
	fr := NewFolderRequest{
		FolderName: fn,
	}

	//Convert User to byte using Json.Marshal
	//Ignoring error.
	body, _ := json.Marshal(fr)

	//Pass new buffer for request with URL to post.
	//This will make a post request and will share the JSON data
	resp, err := http.Post(ep, "application/json", bytes.NewBuffer(body))

	// An error is returned if something goes wrong
	// if err != nil {
	// 	panic(err)
	// }
	//Need to close the response stream, once response is read.
	//Hence defer close. It will automatically take care of it.
	// defer resp.Body.Close()

	//Check response code, if New user is created then read response.
	if resp.StatusCode == http.StatusCreated {
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			//Failed to read response.
			// panic(err)
		}

		//Convert bytes to String and print
		jsonStr := string(body)
		fmt.Println("Response: ", jsonStr)

	} else {
		//The status is not Created. print the error.
		fmt.Println("Get failed with error: ", resp.Status)
	}

	return err

}
