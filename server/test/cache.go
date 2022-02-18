package test

import (
	"fmt"
	"log"
	"time"

	"github.com/vreel/app/cache"
)

func TestCache() {

	ttl := time.Second * 30
	set_err := cache.SetString("Hello", "World", ttl)
	if set_err != nil {
		log.Panic(set_err)
	} else {
		val, err := cache.GetString("Hello")

		if err != nil {
			log.Panic(err)
		} else {
			fmt.Println(val)
		}
	}
}
