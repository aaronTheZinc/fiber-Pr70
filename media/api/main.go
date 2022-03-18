package api

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

var ServerEndPoint = os.Getenv("SERVER_ENDPOINT")

func Start() {
	app := fiber.New()

	FolderHandler(app)
	app.Listen(":7071")
}
