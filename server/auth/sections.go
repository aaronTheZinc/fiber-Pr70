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

func AuthorizeAppendSimpleLink(token string, elementId string, input model.SimpleLinkInput) (model.MutationResponse, error) {

	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb(database.AppendSimpleLink(elementId, input))
	})

	return resp, err
}

func AuthorizeRemoveSimpleLink(token, linkId string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		rErr := database.RemoveSimpleLink(linkId)
		cb("successfully removed link", rErr)
	})
	return resp, err
}
