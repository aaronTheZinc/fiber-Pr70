package api

import (
	"github.com/gofiber/fiber/v2"
)

func Start() {
	app := fiber.New()
	AuthHandler(app)

	app.Listen(":8081")
}
