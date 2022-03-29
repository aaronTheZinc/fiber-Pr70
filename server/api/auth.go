package api

import (
	"encoding/json"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/vreel/app/auth"
	"github.com/vreel/app/database"
)

type ResponseError struct {
	Error string `json:"error"`
}
type AuthorizationResponse struct {
	Authorized bool   `json:"is_authorized"`
	Id         string `json:"id"`
	Username   string `json:"username"`
	Time       string `json:"time"`
	Error      string `json:"error"`
}

func authorizationHandler(c *fiber.Ctx) error {
	var response error
	a := AuthorizationResponse{
		Authorized: false,
	}
	tkn := c.Query("token")
	if tkn == "" {
		e := ResponseError{Error: "must provide token"}
		v, _ := json.Marshal(e)
		response = c.Send(v)
		return response
	} else {
		// token exists
		if claims, ok, err := auth.ParseToken(tkn); err != nil || !ok {
			//token is invalid
			e := ResponseError{Error: "failed to authorize"}
			r, _ := json.Marshal(e)

			response = c.Send(r)
			return response
		} else {
			// token is valid, rerieve data
			if u, err := database.GetUser(claims.ID); err != nil {
				a.Error = err.Error()
			} else {
				a.Authorized = true
				a.Id = u.ID
				a.Time = time.Now().String()
				a.Username = u.Username

			}
		}
	}
	v, e := json.Marshal(&a)
	if e != nil {
		c.SendStatus(500)
		response = c.SendString("failed to format response")
	} else {
		response = c.Send(v)
	}
	return response
}

func AuthHandler(app *fiber.App) {
	g := app.Group("/auth")

	g.Get("/authorize", authorizationHandler)

}
