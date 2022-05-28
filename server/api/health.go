package api

import (
	"encoding/json"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/vreel/app/database"
)

type HealthResponse struct {
	Ok bool `json:"ok"`
}

type ConfigResponse struct {
	MediaServer             string `json:"media_server_endpoint"`
	MediaServerFileEndpoint string `json:"media_server_file_endpoint"`
	DatabaseIsConnected     bool   `json:"database_is_connected"`
}

func ConfigHandler(c *fiber.Ctx) error {
	v, _ := json.Marshal(ConfigResponse{
		MediaServer:             os.Getenv("MEDIA_SERVER_ENDPOINT"),
		MediaServerFileEndpoint: os.Getenv("MEDIA_SERVER_FILE_ENDPOINT"),
		DatabaseIsConnected:     database.IsConnected(),
	})
	return c.Send(v)
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

	g.Get("/config", ConfigHandler)
}
