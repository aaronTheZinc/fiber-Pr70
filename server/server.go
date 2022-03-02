package main

import (
	"fmt"
	"net/http"
	"os"
	"sync"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/vreel/app/cache"
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph"
	"github.com/vreel/app/graph/generated"
)

const defaultPort = "8080"

func InitializeCache() {
	defer fmt.Println("Cache setup...")

	cache.CreateRedis()
}

func GQLHandler() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	router := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           3000, // Maximum value not ignored by any of major browsers
	})
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	router.Use(cors.Handler)
	router.Handle("/", playground.Handler("query", "/graphql"))
	router.Handle("/graphql", srv)
	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		panic(err)
	}
}
func main() {
	godotenv.Load(".env")
	database.Migrate()
	// test.CreateUser()
	// test.GenerateToken()
	var wg sync.WaitGroup
	// test.TestCache()
	database.Migrate()
	InitializeCache()

	wg.Add(1)
	go func() {
		defer wg.Done()
		GQLHandler()
	}()
	wg.Wait()
}
