package middleware

import (
	"fmt"
	"net/http"

	"github.com/vreel/media/api"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
func AuthMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			fmt.Println()
			return
		}
		token := r.Header.Get("token")
		fmt.Println("token" + token)
		if token != "" {
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
		enableCors(&w)
		h.ServeHTTP(w, r)
	})
}
