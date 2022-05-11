package api

import (
	"github.com/gofiber/fiber/v2"
)

func Start() {
	app := fiber.New()
	FilesHandler(app)
	app.Listen(":7071")
}
