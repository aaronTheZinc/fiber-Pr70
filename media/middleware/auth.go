package middleware

import (
	"fmt"
	"net/http"

	"github.com/vreel/media/api"
)

func AuthMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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

			fmt.Fprint(w, "No Token Provided")
		}
		h.ServeHTTP(w, r)
	})
}
