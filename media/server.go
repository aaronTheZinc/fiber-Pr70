package main

import (
	"fmt"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/tus/tusd/pkg/filestore"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/vreel/media/middleware"
	"github.com/vreel/media/test"
)

var n = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// log.Println("Before")
	// h.ServeHTTP(w, r) // call original
	// log.Println("After")
	fmt.Fprintf(w, "")
})

func UIHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("....")
	test.Display(w, "upload", nil)
}
func ServeHTTP(w http.ResponseWriter, r *http.Request) {

}

// func
func main() {
	godotenv.Load(".env")
	// r := mux.NewRouter()
	store := filestore.FileStore{
		Path: "./uploads",
	}
	composer := tusd.NewStoreComposer()
	store.UseIn(composer)
	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:              "/files/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})

	if err != nil {
		panic(fmt.Errorf("Unable to create handler: %s", err))
	}
	go func() {
		for {
			event := <-handler.CompleteUploads

			dd := event.Upload.MetaData["test"]
			fmt.Println(dd)
			fmt.Printf("Upload %s finished\n", event.Upload.ID)
		}

	}()
	// Right now, nothing has happened since we need to start the HTTP server on
	// our own. In the end, tusd will start listening on and accept request at
	// http://localhost:8080/files
	http.Handle("/files/", middleware.AuthMiddleware(http.StripPrefix("/files/", handler)))
	http.HandleFunc("/ui", UIHandler)

	err = http.ListenAndServe(":7070", nil)
	if err != nil {
		panic(fmt.Errorf("Unable to listen: %s", err))
	}
}
