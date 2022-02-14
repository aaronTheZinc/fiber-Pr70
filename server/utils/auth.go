package utils

import "github.com/dgryski/trifles/uuid"

func GenerateUID() string {
	return uuid.UUIDv4()
}
