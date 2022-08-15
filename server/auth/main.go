package auth

import (
	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
)

func AuthorizeRequest(token string, cb func(WebTokenClaims, func(string, error))) (model.MutationResponse, error) {
	var err error
	var resp model.MutationResponse
	claims, isAuth, parseErr := ParseToken(token)
	if isAuth || parseErr == nil {
		cb(claims, func(message string, callBackErr error) {
			if callBackErr != nil {
				err = callBackErr
			} else {
				resp = model.MutationResponse{
					Succeeded: true,
					Message:   message,
				}
			}
		})

	} else {
		return model.MutationResponse{}, e.UNAUTHORIZED_ERROR
	}
	return resp, err
}
