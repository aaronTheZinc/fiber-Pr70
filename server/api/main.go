package api

import (
	"github.com/gofiber/fiber/v2"
)

func Start() {
	app := fiber.New()
	AuthHandler(app)
	HealthHandler(app)
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("[Rest Enabled]")
	})
	app.Listen(":8081")
}
