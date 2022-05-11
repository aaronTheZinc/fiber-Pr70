package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/vreel/media/events"
	"github.com/vreel/media/middleware"
	"github.com/vreel/media/server"
	"github.com/vreel/media/test"
)

func UIHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("....")
	test.Display(w, "upload", nil)
}

// func
func main() {
	godotenv.Load(".env")
	handler := server.StartFileSever()

	go func() {
		events.HandleCompletedUpload(handler)
	}()
	http.Handle("/files/", middleware.AuthMiddleware(http.StripPrefix("/files/", handler)))
	http.HandleFunc("/ui", UIHandler)
	log.Println("Media Server Started!")
	err := http.ListenAndServe(":7070", nil)

	if err != nil {
		panic(fmt.Errorf("Unable to listen: %s", err))
	}
}
