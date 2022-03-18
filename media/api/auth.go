package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/vreel/media/models"
)

func ClientIsAuthorized(token string) (bool, error) {

	var err error
	var ok bool = false

	resp, err := http.Get(ServerEndPoint + "/authorize?token=" + token)
	if body, e := ioutil.ReadAll(resp.Body); err != nil {
		err = e
	} else {

		f := models.AuthResponse{}
		if err := json.Unmarshal(body, &f); err != nil {
			err = e
		}
		ok = f.Authorized
	}
	return ok, err
}
