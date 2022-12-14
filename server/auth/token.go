package auth

import (
	//...
	// import the jwt-go library

	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	//...
)

// Create the JWT key used to create the signature
var jwtKey = []byte(os.Getenv("JWT_SECRET"))

// Create a struct that will be encoded to a JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time
type WebTokenClaims struct {
	ID          string `json:"id"`
	AccountType string `json:"account_type"`
	jwt.StandardClaims
}

func CreateToken(id, accountType string) (string, error) {
	expirationTime := time.Now().Add(7 * (24 * time.Hour))
	claims := &WebTokenClaims{
		ID:          id,
		AccountType: accountType,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString(jwtKey)

	return tokenStr, err
}

//returns claims, isValid and error
func ParseToken(tokenStr string) (WebTokenClaims, bool, error) {
	var claims WebTokenClaims
	var ok bool = false
	tkn, err := jwt.ParseWithClaims(tokenStr, &claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if tkn != nil {
		ok = tkn.Valid
	}
	return claims, ok, err

}

// func VerifyToken(token string) (bool, error) {
// 	tkn, err := ParseToken(token)
// 	return tkn.Valid, err
// }
