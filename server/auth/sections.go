package auth

import (
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
)

func AuthorizeCreateSimpleLinkElement(token string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		vId := claims.ID
		if vreelId != nil {
			vId = *vreelId
		}
		cb(database.CreateSimpleLinkElement(vId))
	})

	return resp, err
}
