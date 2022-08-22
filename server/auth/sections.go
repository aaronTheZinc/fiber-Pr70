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

func AuthorizeDeleteSimpleLinkElement(token, elementId string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully deleted simple link element", database.DeleteSimpleLinkElement(elementId))
	})

	return resp, err
}

func AuthorizeCreateGalleryElement(token string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb(database.CreateGalleryElement(claims.ID))
	})

	return resp, err
}

func AuthorizeAppendImageToGallery(token, elementId string, input model.AddGalleryImageInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb(database.AppendImageToGallery(elementId, input))
	})

	return resp, err
}

func AuthorizeRemoveGalleryImage(token, imageId string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully removed image", database.RemoveGalleryImage(imageId))
	})

	return resp, err
}

func AuthorizeDeleteGalleryElement(token, elementId string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully deleted gallery element", database.DeleteGalleryElement(elementId))
	})

	return resp, err
}

func AuthorizeCreateVideoGalleryElement(token string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		vId := claims.ID
		if vreelId != nil {
			vId = *vreelId
		}
		cb(database.CreateVideoGalleryElement(vId))
	})

	return resp, err
}

func AuthorizeDeleteVideoElement(token, elementId string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully deleted gallery element", database.DeleteVideoGalleryElement(elementId))
	})

	return resp, err
}

func AuthorizeAppendVideoToVideoGallery(token, elementId string, input model.AddVideoInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb(database.AppendVideoToVideoGallery(elementId, input))
	})

	return resp, err
}

func AuthorizeRemoveVideoFromVideoGallery(token, imageId string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully removed video", database.RemoveVideoFromVideoGallery(imageId))
	})

	return resp, err
}
