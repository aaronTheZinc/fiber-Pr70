package api

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/vreel/media/database"
)

func GetFilesHandler(c *fiber.Ctx) error {
	userId := c.Query("id")
	log.Println("hitting")
	if userId == "" {
		c.SendString("[failed]:  " + "id is required.")
	}
	files, err := database.GetUserFiles(userId)
	fmt.Println(files)
	if err != nil {
		return c.Status(400).SendString("[failed]: " + err.Error())
	}
	resp, _ := json.Marshal(files)
	return c.Status(201).Send(resp)

}
func FilesHandler(app *fiber.App) {
	g := app.Group("/files")

	g.Get("/", GetFilesHandler)
}
