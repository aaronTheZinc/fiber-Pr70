package api

import "github.com/gofiber/fiber/v2"

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

func CreateFolder(c *fiber.Ctx) error {
	return c.SendString("")
}
func FolderHandler(app *fiber.App) {
	f := app.Group("/files")

	f.Post("/new_folder", CreateFolder)

}
