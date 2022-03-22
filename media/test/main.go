package test

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/vreel/media/utils"
)

var templates = template.Must(template.ParseFiles("test/pages/index.html"))

// Display the named template
func Display(w http.ResponseWriter, page string, data interface{}) {
	templates.ExecuteTemplate(w, "index.html", data)
}

func CheckFolder() {
	ok := utils.UserFolderExists("aaron19")

	fmt.Println(ok)
}
