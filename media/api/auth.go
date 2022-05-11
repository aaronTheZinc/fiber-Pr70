package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/vreel/media/models"
)

func ClientIsAuthorized(token string) (bool, error) {
	var ServerEndPoint = os.Getenv("SERVER_ENDPOINT")
	fmt.Println("endpoint: " + ServerEndPoint)
	var err error
	var ok bool = false

	resp, err := http.Get("http://localhost:8081" + "/auth" + "/authorize?token=" + token)
	if body, e := ioutil.ReadAll(resp.Body); err != nil {
		err = e
	} else {

		f := models.AuthResponse{}
		if err := json.Unmarshal(body, &f); err != nil {
			err = e
		}

		fmt.Println(f)
		ok = f.Authorized
	}
	return ok, err
}

func GetClientInfo(token string) (models.AuthResponse, error) {
	var ServerEndPoint = os.Getenv("SERVER_ENDPOINT")
	var auth models.AuthResponse
	var err error

	resp, err := http.Get(ServerEndPoint + "/auth" + "/authorize?token=" + token)
	if body, e := ioutil.ReadAll(resp.Body); err != nil {
		err = e
	} else {

		if err := json.Unmarshal(body, &auth); err != nil {
			err = e
		}

	}
	return auth, err
}
