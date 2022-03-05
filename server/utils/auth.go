package utils

import (
	"github.com/dgryski/trifles/uuid"
	"github.com/rs/xid"
)

func GenerateUID() string {
	return uuid.UUIDv4()
}

func GenerateId() string {
	guid := xid.New()
	return guid.String()
}
