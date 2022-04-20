package api

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"github.com/vreel/app/database"
)

type HealthResponse struct {
	Ok bool `json:"ok"`
}

func HealthHandler(app *fiber.App) {
	g := app.Group("/health")

	g.Get("/health", func(c *fiber.Ctx) error {
		ok := false
		ok = database.IsConnected()
		if ok {
			b, _ := json.Marshal(HealthResponse{Ok: true})
			return c.Send(b)
		} else {
			return nil
		}
	})
}
