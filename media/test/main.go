package test

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/vreel/media/utils"
)

var templates = template.Must(template.ParseFiles("test/pages/upload.html"))

// Display the named template
func Display(w http.ResponseWriter, page string, data interface{}) {
	templates.ExecuteTemplate(w, page+".html", data)
}

func CheckFolder() {
	ok := utils.UserFolderExists("aaron19")

	fmt.Println(ok)
}
