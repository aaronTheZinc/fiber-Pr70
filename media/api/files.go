package api

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/vreel/media/utils"
)

type NewFolderRequest struct {
	FolderName string `json:"folder_name"`
}

type FolderRemovalRequest struct {
	FolderName string `json:"folder_name"`
}

type FileCreation struct {
	FileName string `json:"file_name"`
	FileSize int
}

type FileResponse struct {
	ErrorMessage string `json:"error_message"`
}

func FileIndexRoute(c *fiber.Ctx) error {
	return c.SendString("Hello files!")
}
func CreateFolder(c *fiber.Ctx) error {
	fmt.Print("hit \n")
	b := NewFolderRequest{}
	if err := c.BodyParser(&b); err != nil {
		fmt.Println("failed to parse")
		return c.SendString("failed to parse")
	} else {
		err := utils.CreateUserDirectory(b.FolderName)
		if err != nil {
			return c.SendString("failed to create folder")
		} else {
			return c.SendString("created folder! ")
		}
	}
}
func FolderHandler(app *fiber.App) {
	f := app.Group("/files")

	f.Post("/new_folder", CreateFolder)
	f.Get("/", FileIndexRoute)

}
