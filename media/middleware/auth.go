package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/vreel/media/api"
)

// func enableCors(w *http.ResponseWriter) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
// }
func AuthMiddleware(h http.Handler) http.Handler {
	return CORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("[Tus Request Method] ", r.Method)
		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			fmt.Println()
			return
		}
		if r.Method == "GET" {
			h.ServeHTTP(w, r)
			return
		}
		token := r.Header.Get("token")
		if token != "" && r.Method != "GET" {
			ok, err := api.ClientIsAuthorized(token)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
			} else {
				if !ok {
					w.WriteHeader(http.StatusUnauthorized)
				}
			}

		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}
		h.ServeHTTP(w, r)
	}))
}
func CORS(h http.Handler) http.Handler {
	var env string = os.Getenv("ENV")
	log.Println(env)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if env == "dev" || env != "" {
			log.Println("[Adding Cors]")
			w.Header().Add("Access-Control-Allow-Origin", "*")
			w.Header().Add("Access-Control-Allow-Credentials", "true")
			w.Header().Add("Access-Control-Allow-Headers", "*")
			w.Header().Add("Access-Control-Request-Headers", "*")

			w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD, PATCH")

		} else {
			log.Println("not adding cors")
		}
		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			log.Println("[Preflight Request]")
			return
		}
		h.ServeHTTP(w, r)
	})

}
