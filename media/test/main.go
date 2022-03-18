package test

import (
	"html/template"
	"net/http"
)

var templates = template.Must(template.ParseFiles("pages/upload.html"))

// Display the named template
func Display(w http.ResponseWriter, page string, data interface{}) {
	templates.ExecuteTemplate(w, page+".html", data)
}
