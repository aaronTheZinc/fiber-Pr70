package main

import (
	"log"
	"net/http"
	"os"

	"sync"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph"
	"github.com/vreel/app/graph/generated"
)

const defaultPort = "8080"

func GQLHandler() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
func main() {
	var wg sync.WaitGroup

	database.Migrate()

	wg.Add(1)
	go func() {
		defer wg.Done()
		GQLHandler()
	}()
	wg.Wait()
}
