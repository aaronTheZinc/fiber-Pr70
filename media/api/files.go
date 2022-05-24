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
	response := models.FileEditResponse{}
	response.Succeeded = false

	b := models.EditFileNameRequest{}

	if parseErr := c.BodyParser(&b); parseErr != nil {
		response.Error = "failed to parse request."
	}

	if b.UserId == "" {
		response.Error = "no user id provided."
	}

	if err := database.EditFileName(b.UserId, b.FileId, b.NewFileName); err != nil {
		response.Error = err.Error()
	} else {
		response.Succeeded = true
	}
	v, _ := json.Marshal(&response)
	return c.Send(v)
}

func FileDeletionHandler(c *fiber.Ctx) error {
	response := models.FileEditResponse{}
	response.Succeeded = false
	b := models.FileDeletionRequest{}

	if parseErr := c.BodyParser(&b); parseErr != nil {
		response.Error = "failed to parse request."
		v, _ := json.Marshal(&response)
		return c.Send(v)
	}

	if b.UserId == "" || b.FileId == "" {
		response.Error = "missing required fields"
		v, _ := json.Marshal(&response)
		return c.Send(v)
	}

	if err := database.DeleteFile(b.UserId, b.FileId); err != nil {
		response.Error = err.Error()
		v, _ := json.Marshal(&response)
		return c.Send(v)
	}
	response.Succeeded = true

	v, _ := json.Marshal(&response)

	return c.Send(v)

}

func FilesHandler(app *fiber.App) {
	g := app.Group("/files")

	g.Get("/", GetFilesHandler)
	g.Post("/filename/edit", EditFileNameHandler)
	g.Post("/delete", FileDeletionHandler)
}
