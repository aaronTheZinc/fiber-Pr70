package api

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

type AuthorizationResponse struct {
	Authorized bool   `json:"is_authorized"`
	Id         string `json:"id"`
	Username   string `json:"username"`
	Time       string `json:"time"`
	Error      string `json:"error"`
}

func authorizationHandler(c *fiber.Ctx) error {
	tkn := c.Query("token")
	if tkn == "" {
		v, _ := json.Marshal(AuthorizationResponse{Error: "must provide a token"})
		return c.Send(v)
	}
	return c.SendString("Hello World!")
}

func AuthHandler(app *fiber.App) {
	g := app.Group("/auth")

	g.Get("/authorize", authorizationHandler)

}
