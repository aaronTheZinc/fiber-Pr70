package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/joho/godotenv"
	"github.com/vreel/media/api"
	"github.com/vreel/media/database"
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
	wg := sync.WaitGroup{}
	handler := server.StartFileSever()
	database.Migrate()
	wg.Add(1)
	go func() {
		defer wg.Done()
		events.HandleCompletedUpload(handler)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		api.Start()
	}()
	http.Handle("/files/", middleware.AuthMiddleware(http.StripPrefix("/files/", handler)))
	http.HandleFunc("/ui", UIHandler)
	log.Println("Media Server Started!")
	err := http.ListenAndServe(":7070", nil)
	wg.Wait()
	if err != nil {
		panic(fmt.Errorf("Unable to listen: %s", err))
	}
}
