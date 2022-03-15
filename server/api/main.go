package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vreel/app/utils"
)

func Init() {
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		v, _ := utils.GetDefaultElementsString()
		return c.Send([]byte(v))
	})

	app.Listen(":8081")
}
