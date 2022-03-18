package main

import (
	"net/http"
	"sync"

	"github.com/vreel/media/api"
	"github.com/vreel/media/handler"
)

// Compile templates on start of the application
// var templates = template.Must(template.ParseFiles("test/pages/upload.html"))

// Display the named template
// func display(w http.ResponseWriter, page string, data interface{}) {
// 	templates.ExecuteTemplate(w, page+".html", data)
// }

// func uploadHandler(w http.ResponseWriter, r *http.Request) {
// 	switch r.Method {
// 	case "GET":
// 		display(w, "upload", nil)
// 	case "POST":
// 		uploadFile(w, r)
// 	}
// }

func main() {
	// Upload route
	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		defer wg.Done()
		api.Start()
	}()

	go func() {
		defer wg.Done()
		http.HandleFunc("/upload", handler.UploadFileHandler)
	}()

	wg.Wait()

	http.ListenAndServe(":7070", nil)

	//Listen on port 8080

}
