package middleware

import (
	"fmt"
	"log"
	"net/http"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
func AuthMiddleware(h http.Handler) http.Handler {
	return CORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("[Tus Request Method] ", r.Method)
		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			fmt.Println()
			return
		}
		// token := r.Header.Get("token")
		// if token != "" && r.Method != "GET" {
		// 	ok, err := api.ClientIsAuthorized(token)
		// 	if err != nil {
		// 		w.WriteHeader(http.StatusInternalServerError)
		// 	} else {
		// 		if !ok {
		// 			w.WriteHeader(http.StatusUnauthorized)
		// 		}
		// 	}
		// } else {

		// 	w.WriteHeader(http.StatusUnauthorized)
		// }
		// enableCors(&w)
		h.ServeHTTP(w, r)
	}))
}
func CORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "*")
		w.Header().Add("Access-Control-Request-Headers", "*")

		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD, PATCH")

		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			log.Println("[Preflight Request]")
			return
		}
		h.ServeHTTP(w, r)
	})

}
