// package main

// import (
// 	"fmt"
// 	"net/http"
// 	"sync"

// 	"github.com/joho/godotenv"
// 	"github.com/vreel/media/api"
// 	"github.com/vreel/media/handler"
// 	"github.com/vreel/media/test"
// )

// // Compile templates on start of the application
// // var templates = template.Must(template.ParseFiles("test/pages/upload.html"))

// // Display the named template
// // func display(w http.ResponseWriter, page string, data interface{}) {
// // 	templates.ExecuteTemplate(w, page+".html", data)
// // }

// // func uploadHandler(w http.ResponseWriter, r *http.Request) {
// // 	switch r.Method {
// // 	case "GET":
// // 		display(w, "upload", nil)
// // 	case "POST":
// // 		uploadFile(w, r)
// // 	}
// // }

// func main() {
// 	// Upload route
// 	godotenv.Load(".env")
// 	test.CheckFolder()
// 	var wg sync.WaitGroup

// 	wg.Add(1)
// 	go func() {
// 		defer wg.Done()
// 		api.Start()
// 	}()

// 	wg.Add(1)
// 	go func() {
// 		defer wg.Done()
// 		fmt.Println("adding handler!!")
// 		http.HandleFunc("/upload", handler.UploadFileHandler)
// 		http.ListenAndServe(":7070", nil)
// 	}()

// 	wg.Wait()

// 	//Listen on port 8080

// }
package main

import (
	"fmt"
	"net/http"

	"github.com/tus/tusd/pkg/filestore"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/vreel/media/test"
)

func UIHandler(w http.ResponseWriter, req *http.Request) {
	test.Display(w, "upload", nil)
}

func main() {

	// Create a new FileStore instance which is responsible for
	// storing the uploaded file on disk in the specified directory.
	// This path _must_ exist before tusd will store uploads in it.
	// If you want to save them on a different medium, for example
	// a remote FTP server, you can implement your own storage backend
	// by implementing the tusd.DataStore interface.
	store := filestore.FileStore{
		Path: "./uploads",
	}

	// A storage backend for tusd may consist of multiple different parts which
	// handle upload creation, locking, termination and so on. The composer is a
	// place where all those separated pieces are joined together. In this example
	// we only use the file store but you may plug in multiple.
	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	// Create a new HTTP handler for the tusd server by providing a configuration.
	// The StoreComposer property must be set to allow the handler to function.
	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:              "/files/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})
	if err != nil {
		panic(fmt.Errorf("Unable to create handler: %s", err))
	}

	// Start another goroutine for receiving events from the handler whenever
	// an upload is completed. The event will contains details about the upload
	// itself and the relevant HTTP request.
	go func() {
		for {
			event := <-handler.CompleteUploads
			fmt.Printf("Upload %s finished\n", event.Upload.ID)
		}
	}()

	// Right now, nothing has happened since we need to start the HTTP server on
	// our own. In the end, tusd will start listening on and accept request at
	// http://localhost:8080/files
	http.Handle("/files/", http.StripPrefix("/files/", handler))
	http.HandleFunc("/ui", UIHandler)
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(fmt.Errorf("Unable to listen: %s", err))
	}
}
