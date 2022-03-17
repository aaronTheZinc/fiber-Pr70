package api

import "github.com/gofiber/fiber/v2"

func Start() {
	app := fiber.New()

	FolderHandler(app)
	app.Listen(":3000")
}
