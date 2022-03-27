package test

import (
	"html/template"
	"net/http"
)

var templates = template.Must(template.ParseFiles("test/pages/index.html"))

// Display the named template
func Display(w http.ResponseWriter, page string, data interface{}) {
	templates.ExecuteTemplate(w, "index.html", data)
}
