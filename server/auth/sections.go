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
		vId := claims.ID
		if vreelId != nil {
			vId = *vreelId
		}
		cb(database.CreateGalleryElement(vId))
	})

	return resp, err
}

func AuthorizeAppendSlideToGallery(token, elementId string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb(database.AppendSlideToGallery(claims.ID, elementId))
	})

	return resp, err
}

func AuthorizeRemoveGallerySlide(token, imageId string) (model.MutationResponse, error) {
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

func AuthorizeCreateSocialsElement(token string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		vId := claims.ID
		if vreelId != nil {
			vId = *vreelId
		}
		cb(database.CreateSocialsElement(vId))
	})
	return resp, err
}

func AuthorizeAppendSocialToSocialsElement(token, elementId string, input model.SocialsInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb(database.AppendToSocialLinks(elementId, input))
	})

	return resp, err
}

func AuthorizeDeleteSocialsElement(token, elementId string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully deleted gallery element", database.DeleteSocialsElement(elementId))
	})

	return resp, err
}
func AuthorizeRemoveSocialsLink(token, socialsId string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully removed social link", database.RemoveSocialLinks(socialsId))
	})

	return resp, err
}

func AuthorizeUpdateSimpleLink(token, linkId string, input model.SimpleLinkInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated simple link", database.UpdateSimpleLink(linkId, input))
	})

	return resp, err
}

func AuthorizeUpdateGalleryImage(token, imageId string, input model.AddGalleryImageInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated gallery image", database.UpdateGalleryImage(imageId, input))
	})

	return resp, err
}

func AuthorizeUpdateVideoGalleryVideo(token, imageId string, input model.AddVideoInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated video gallery image", database.UpdateVideoGalleryImage(imageId, input))
	})

	return resp, err
}

func AuthorizeUpdateSocialsLink(token, socialsId string, input model.SocialsInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated video gallery image", database.UpdateSocialsLinks(socialsId, input))
	})

	return resp, err
}

func AuthorizeEditElementPosition(token, elementId, elementType string, position int) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated element position", database.EditElementPosition(elementId, elementType, position))
	})

	return resp, err
}
func AuthorizeEditElementHeader(token, elementId, elementType string, header string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated element position", database.EditElementHeader(elementId, elementType, header))
	})

	return resp, err
}

func AuthorizeCreateEmbedElement(token string, vreelId *string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		vId := claims.ID
		if vreelId != nil {
			vId = *vreelId
		}
		cb("successfully updated element position", database.CreateEmbed(vId))
	})

	return resp, err
}

func AuthorizeEditEmbedElement(token, elementId string, input model.AddEmbedInput) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated embed", database.EditEmbed(elementId, input))
	})

	return resp, err
}

func AuthorizeDeleteEmbed(token, elementId string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully deleted embed", database.DeleteEmbedElement(elementId))
	})
	return resp, err
}
func AuthorizeEditBackgroundColor(token, elementId, elementType, backgroundColor string) (model.MutationResponse, error) {
	resp, err := AuthorizeRequest(token, func(claims WebTokenClaims, cb func(message string, err error)) {
		cb("successfully updated background color", database.EditElementBackgroundColor(elementId, elementType, backgroundColor))
	})
	return resp, err
}
