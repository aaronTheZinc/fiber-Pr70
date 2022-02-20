package test

import (
	"fmt"
	"log"

	"github.com/vreel/app/auth"
)

func GenerateToken() {
	// err := godotenv.Load(".env")
	// if err != nil {
	// 	log.Fatalf("Error loading .env file")
	// }

	// getting env variables SITE_TITLE and DB_HOST
	token, err := auth.CreateToken("1")

	fmt.Println("tkn", token)
	if err != nil {
		log.Panic(err.Error())
	}
	ok, _ := auth.VerifyToken(token)

	fmt.Println(ok)
	// fmt.Println(ok)

	// fmt.Println(token)
}
