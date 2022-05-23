package api

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/vreel/media/database"
	"github.com/vreel/media/models"
)

//get all user files by id
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

//edit file information
func EditFileNameHandler(c *fiber.Ctx) error {
	b := models.EditFileNameRequest{}
	if parseErr := c.BodyParser(&b); parseErr != nil {
		return c.SendString(parseErr.Error())
	}
	if b.UserId == "" {
		return c.SendString("[failed]: user id is required.")
	}

	if err := database.EditFileName(b.UserId, b.FileId, b.NewFileName); err != nil {
		return c.SendString(err.Error())
	}
	return c.SendString("[completed] changed file name to: " + b.NewFileName)
}
func FilesHandler(app *fiber.App) {
	g := app.Group("/files")

	g.Get("/", GetFilesHandler)
	g.Post("/filename/edit", EditFileNameHandler)
}
