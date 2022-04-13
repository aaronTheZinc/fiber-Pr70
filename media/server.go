package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/tus/tusd/pkg/filestore"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/vreel/media/middleware"
	"github.com/vreel/media/test"
)

func CORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST")

			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, Authorization")
			return
		} else {
			h.ServeHTTP(w, r)
		}
	})
}

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

	r := mux.NewRouter()
	r.Handle("/files/", middleware.AuthMiddleware(http.StripPrefix("/files/", handler)))
	r.HandleFunc("/ui", UIHandler)

	cors := cors.New(cors.Options{
		AllowedOrigins:     []string{"*"}, //viper.GetString("ORIGIN_ALLOWED")
		AllowedHeaders:     []string{"*"},
		AllowedMethods:     []string{"GET", "PATCH", "POST", "PUT", "OPTIONS", "DELETE", "HEAD"},
		Debug:              true,
		AllowCredentials:   true,
		OptionsPassthrough: false,
		MaxAge:             300,
	})

	h := cors.Handler(r)
	if err != nil {
		panic(fmt.Errorf("Unable to create handler: %s", err))
	}

	// Right now, nothing has happened since we need to start the HTTP server on
	// our own. In the end, tusd will start listening on and accept request at
	// http://localhost:8080/files
	// http.Handle("/files/", CORS(middleware.AuthMiddleware(http.StripPrefix("/files/", handler))))
	// http.HandleFunc("/ui", UIHandler)

	err = http.ListenAndServe(":7070", h)
	if err != nil {
		panic(fmt.Errorf("Unable to listen: %s", err))
	}
}
