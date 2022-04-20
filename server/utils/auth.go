package utils

import (
	"github.com/dgryski/trifles/uuid"
	"github.com/rs/xid"
)

var AccountTypes = []string{"standard", "enterprise"}

func GenerateUID() string {
	return uuid.UUIDv4()
}

func GenerateId() string {
	guid := xid.New()
	return guid.String()
}

func IsValidAccountType(s string) bool {
	return ItemExistsInStringSlice(s, AccountTypes)
}
