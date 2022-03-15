package test

import (
	"fmt"
	"log"

	"github.com/vreel/app/utils"
)

func MarshalElements() {
	s, e := utils.GetDefaultElementsString()
	if e != nil {
		log.Panic(e.Error())
	}
	fmt.Printf("elements: %s", s)
}
