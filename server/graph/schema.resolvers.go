package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/vreel/app/analytics"
	"github.com/vreel/app/auth"
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/generated"
	"github.com/vreel/app/graph/model"
)

func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (*model.User, error) {
	user, err := auth.CreateNewUser(input)
	return &user, err
}

func (r *mutationResolver) EditSlide(ctx context.Context, token string, slideID string, slide model.SlideInput) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateEvent(ctx context.Context, token string, input model.NewEvent) (*model.Event, error) {
	event, err := auth.CreateEvent(token, input)
	return &event, err
}

func (r *mutationResolver) RemoveEmployeeFromEnterprise(ctx context.Context, token string, employee string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveEmployeeFromEnterprise(token, employee)

	return &resp, err
}

func (r *mutationResolver) RemoveEnterprise(ctx context.Context, token string, id string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteEnterprise(token, id)

	return &resp, err
}

func (r *mutationResolver) RemoveUser(ctx context.Context, id string) (*model.MutationResponse, error) {
	resp, err := auth.RemoveUser(id)

	return &resp, err
}

func (r *mutationResolver) ResetElements(ctx context.Context, token string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeResetElements(token)

	return &resp, err
}

func (r *mutationResolver) CreateEnterprise(ctx context.Context, input model.NewEnterprise) (*model.Enterprise, error) {
	enterprise, err := auth.CreateNewEnterprise(input)

	return &enterprise, err
}

func (r *mutationResolver) CreateResetPasswordRequestIntent(ctx context.Context, email string) (*model.ResetPasswordResponse, error) {
	auth, err := auth.CreateResetPasswordRequestIntent(email)
	return &auth, err
}

func (r *mutationResolver) ResolveResetPasswordRequestIntent(ctx context.Context, token string, password string) (*model.ResolvedPasswordReset, error) {
	resp, err := auth.UpdatePassword(token, password)
	return &resp, err
}

func (r *mutationResolver) CreateGroup(ctx context.Context, input *model.NewGroup) (*model.Group, error) {
	g, err := auth.AuthorizeAddGroupToUser(*input)

	return &g, err
}

func (r *mutationResolver) CreateSlide(ctx context.Context, token string) (*model.Slide, error) {
	resp, err := auth.AuthorizeCreateSlide(token)

	return &resp, err
}

func (r *mutationResolver) RemoveSocialLink(ctx context.Context, token string, platform string, vreelID *string) (*model.MutationResponse, error) {
	return nil, nil
}

func (r *mutationResolver) DeleteGroup(ctx context.Context, id string, token string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteGroup(token, id)
	return &resp, err
}

func (r *mutationResolver) AddUserToGroup(ctx context.Context, token string, groupID string, userID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddUserToGroup(token, groupID, userID)

	return &resp, err
}

func (r *mutationResolver) AddEmployeeToEnterprise(ctx context.Context, token string, newUser model.NewUser) (*model.User, error) {
	employee, err := auth.AuthorizeAddEmployeeToEnterprise(token, newUser)

	return &employee, err
}

func (r *mutationResolver) UpdateEmployee(ctx context.Context, token string, employee string, fields []*model.VreelFields) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateEmployeeFields(token, employee, fields)

	return &resp, err
}

func (r *mutationResolver) RemoveUserFromGroup(ctx context.Context, token string, groupID string, member string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveUserFromGroup(token, groupID, member)
	return &resp, err
}

func (r *mutationResolver) RemoveSlide(ctx context.Context, token string, slideID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveSlide(token, *slideID)
	return &resp, err
}

func (r *mutationResolver) UpdateVreelField(ctx context.Context, token string, fields []*model.VreelFields) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateUser(ctx context.Context, token string, fields []*model.VreelFields) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateUserFields(token, fields)
	return &resp, err
}

func (r *mutationResolver) UpdateSlide(ctx context.Context, token *string, slideID string, data string) (*model.Slide, error) {
	slide, err := auth.AuthorizeEditSlide(*token, slideID, data)

	return &slide, err
}

func (r *mutationResolver) LikeSlide(ctx context.Context, input model.AnalyticsMutation) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeSlideLike(input.Target, input.Token)

	return &resp, err
}

func (r *mutationResolver) UnLikeSlide(ctx context.Context, input model.AnalyticsMutation) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeSlideRemoveLike(input.Target, input.Token)

	return &resp, err
}

func (r *mutationResolver) Follow(ctx context.Context, input model.AnalyticsMutation) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeFollowVreel(input.Target, input.Token)
	return &resp, err
}

func (r *mutationResolver) UnFollow(ctx context.Context, input model.AnalyticsMutation) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUnfollowVreel(input.Token, input.Target)

	return &resp, err
}

func (r *mutationResolver) LogPageLoad(ctx context.Context, vreelID string) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) EditElementPosition(ctx context.Context, token string, elementID string, elementType string, position int) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditElementPosition(token, elementID, elementType, position)

	return &resp, err
}

func (r *mutationResolver) EditFileName(ctx context.Context, token string, newName string, fileID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditFileName(token, fileID, newName)
	return &resp, err
}

func (r *mutationResolver) RemoveImageFromVreelGallery(ctx context.Context, token string, imageID string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveImageFromGallery(token, imageID, vreelID)

	return &resp, err
}

func (r *mutationResolver) DeleteFile(ctx context.Context, token string, fileID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteFile(token, fileID)

	return &resp, err
}

func (r *mutationResolver) AddSimpleVreelLink(ctx context.Context, token string, link model.SimpleLinkInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddSimpleLinkToVreel(token, link.ToLink(""), vreelID)

	return &resp, err
}

func (r *mutationResolver) RemoveSimpleVreelLink(ctx context.Context, token string, linkID string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveSimpleLinkFromVreel(token, linkID, vreelID)

	return &resp, err
}

func (r *mutationResolver) AddSuperVreelLink(ctx context.Context, token string, link *model.SuperLinkInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddSuperLinkToVreel(token, link.ToLink())

	return &resp, err
}

func (r *mutationResolver) AddSocialMediaLink(ctx context.Context, token string, input model.SocialsInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddSocialsLink(token, input)

	return &resp, err
}

func (r *mutationResolver) AddImageToVreelGallery(ctx context.Context, token string, input model.AddGalleryImageInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddImageToGallery(token, input, vreelID)

	return &resp, err
}

func (r *mutationResolver) AddContributionLink(ctx context.Context, token string, input model.ContributionsInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddContributionLinkToVreel(token, input)

	return &resp, err
}

func (r *mutationResolver) UpdateVreelLogo(ctx context.Context, token string, uri string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditVreelLogo(token, uri)

	return &resp, err
}

func (r *mutationResolver) AddMusicLink(ctx context.Context, token string, input model.MusicInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddMusicLinkToVreel(token, input)

	return &resp, err
}

func (r *mutationResolver) RemoveMusicLink(ctx context.Context, token string, linkID string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveMusicLinkFromVreel(token, linkID)

	return &resp, err
}

func (r *mutationResolver) RemoveContributionLink(ctx context.Context, token string, linkID string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveContributionLinkFromVreel(token, linkID)

	return &resp, err
}

func (r *mutationResolver) AddVideoToVreel(ctx context.Context, token string, input model.AddVideoInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddVideoToVreel(token, input.ToVideo(), vreelID)

	return &resp, err
}

func (r *mutationResolver) RemoveVideoFromVreel(ctx context.Context, token string, videoID string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveVideoFromVreel(token, videoID, vreelID)

	return &resp, err
}

func (r *mutationResolver) UpdateSlideLocation(ctx context.Context, token string, slideID *string, location int) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateSlideLocation(token, *slideID, location)

	return &resp, err
}

func (r *mutationResolver) SetElementIsHidden(ctx context.Context, token string, element string, state bool, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateElementVisibility(token, element, state)

	return &resp, err
}

func (r *mutationResolver) AddPage(ctx context.Context, token string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddPage(token)

	return &resp, err
}

func (r *mutationResolver) EditSimpleLink(ctx context.Context, token string, linkID string, link model.SimpleLinkInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditSimpleLink(token, linkID, link, nil)

	return &resp, err
}

func (r *mutationResolver) EditSocialsInput(ctx context.Context, token string, platform string, social model.SocialsInput, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditSocialsLink(token, platform, social, vreelID)

	return &resp, err
}

func (r *mutationResolver) CreateSimpleLinkElement(ctx context.Context, token string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeCreateSimpleLinkElement(token, vreelID)

	return &resp, err
}

func (r *mutationResolver) DeleteSimpleLinkElement(ctx context.Context, token string, vreelID *string, elementID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteSimpleLinkElement(token, elementID, vreelID)

	return &resp, err
}

func (r *mutationResolver) AppendSimpleLink(ctx context.Context, token string, elementID string, link model.SimpleLinkInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAppendSimpleLink(token, elementID, link)

	return &resp, err
}

func (r *mutationResolver) RemoveSimpleLink(ctx context.Context, token string, linkID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveSimpleLink(token, *linkID)

	return &resp, err
}

func (r *mutationResolver) CreateGalleryElement(ctx context.Context, token string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeCreateGalleryElement(token, vreelID)

	return &resp, err
}

func (r *mutationResolver) DeleteGalleryElement(ctx context.Context, token string, elementID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteGalleryElement(token, elementID, nil)

	return &resp, err
}

func (r *mutationResolver) AppendSlideToGallery(ctx context.Context, token string, elementID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAppendSlideToGallery(token, elementID)

	return &resp, err
}

func (r *mutationResolver) RemoveGallerySlide(ctx context.Context, token string, imageID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveGallerySlide(token, imageID)

	return &resp, err
}

func (r *mutationResolver) CreateVideoElement(ctx context.Context, token string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeCreateVideoGalleryElement(token, vreelID)

	return &resp, err
}

func (r *mutationResolver) AppendVideoToVideoGallery(ctx context.Context, token string, elementID *string, video model.AddVideoInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAppendVideoToVideoGallery(token, *elementID, video)

	return &resp, err
}

func (r *mutationResolver) CreateSocialsElement(ctx context.Context, token string, vreelID *string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeCreateSocialsElement(token, vreelID)

	return &resp, err
}

func (r *mutationResolver) AppendSocialsLink(ctx context.Context, token string, elementID string, link model.SocialsInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAppendSocialToSocialsElement(token, elementID, link)

	return &resp, err
}

func (r *mutationResolver) DeleteSocialsElement(ctx context.Context, token string, elementID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteSocialsElement(token, elementID, nil)

	return &resp, err
}

func (r *mutationResolver) RemoveSocialsLink(ctx context.Context, token string, socialsID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeRemoveSocialsLink(token, socialsID)

	return &resp, err
}

func (r *mutationResolver) EditSimpleLinkElementLink(ctx context.Context, token string, elementID string, input model.SimpleLinkInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateSimpleLink(token, elementID, input)

	return &resp, err
}

func (r *mutationResolver) EditGalleryImage(ctx context.Context, token string, imageID string, input model.AddGalleryImageInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateGalleryImage(token, imageID, input)

	return &resp, err
}

func (r *mutationResolver) EditSocialLink(ctx context.Context, token string, linkID string, input model.SocialsInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateSocialsLink(token, linkID, input)

	return &resp, err
}

func (r *mutationResolver) EditVideoGalleryVideo(ctx context.Context, token string, videoID string, input model.AddVideoInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeUpdateVideoGalleryVideo(token, videoID, input)

	return &resp, err
}

func (r *mutationResolver) EditElementHeader(ctx context.Context, token string, elementID string, elementType string, header string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditElementHeader(token, elementID, elementType, header)

	return &resp, err
}

func (r *mutationResolver) CreateEmbedElement(ctx context.Context, token string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeCreateEmbedElement(token)

	return &resp, err
}

func (r *mutationResolver) EditEmbed(ctx context.Context, token string, elementID string, embed model.AddEmbedInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditEmbedElement(token, elementID, embed)

	return &resp, err
}

func (r *mutationResolver) DeleteEmbedElement(ctx context.Context, token string, elementID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteEmbed(token, elementID)

	return &resp, err
}

func (r *queryResolver) User(ctx context.Context, id *string) (*model.User, error) {
	user, err := database.GetUser(*id)
	return &user, err
}

func (r *queryResolver) Username(ctx context.Context, username *string) (*model.User, error) {
	user, err := database.GetUserByUsername(*username)

	return &user, err
}

func (r *queryResolver) Email(ctx context.Context, email string) (*model.User, error) {
	user, err := database.GetUserByEmail(email)
	return &user, err
}

func (r *queryResolver) GetUserByToken(ctx context.Context, token string) (*model.User, error) {
	user, err := auth.GetUserByToken(token)

	return &user, err
}

func (r *queryResolver) Login(ctx context.Context, input *model.LoginInput) (*model.LocalSession, error) {
	localSession, err := auth.Login(input.Email, input.Password)
	return &localSession, err
}

func (r *queryResolver) Slide(ctx context.Context, id string) (*model.Slide, error) {
	slide, err := database.GetSlide(id)

	return &slide, err
}

func (r *queryResolver) Group(ctx context.Context, id string, token string) (*model.Group, error) {
	g, err := auth.AuthorizeGetGroup(token, id)
	return &g, err
}

func (r *queryResolver) Enterprise(ctx context.Context, id string) (*model.Enterprise, error) {
	enterprise, err := database.GetEnterprise(id)

	return &enterprise, err
}

func (r *queryResolver) EnterpriseByToken(ctx context.Context, token string) (*model.Enterprise, error) {
	enterprise, err := auth.GetEnterpriseByToken(token)

	return &enterprise, err
}

func (r *queryResolver) EnterpiseEmployee(ctx context.Context, enterpriseName string, employeeID string) (*model.EnterpriseEmployee, error) {
	employee, err := database.GetEenterpriseEmployee(enterpriseName, employeeID)

	return &employee, err
}

func (r *queryResolver) ServerAnalytics(ctx context.Context) (*model.ServerAnalytics, error) {
	a, err := analytics.GetServerAnalytics()

	return &a, err
}

func (r *queryResolver) Analytics(ctx context.Context, id string) (*model.Analytics, error) {
	a, err := analytics.GetAnalytics(id)
	return &a, err
}

func (r *queryResolver) AnalyticsFragment(ctx context.Context, id string) (*model.AnalyticFragment, error) {
	f, err := database.GetAnalyticsFragment(id)
	return &f, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) AppendImageToGallery(ctx context.Context, token string, elementID string, image model.AddGalleryImageInput) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAppendSlideToGallery(token, elementID)

	return &resp, err
}
func (r *mutationResolver) AppendLinks(ctx context.Context, token string, elementID string, link model.SocialsInput) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *mutationResolver) EditElementLocation(ctx context.Context, token string, element string, position int) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *mutationResolver) RemoveSimpleVreelLinkI(ctx context.Context, token string, linkID string) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *mutationResolver) AnalyticsUpdate(ctx context.Context, token string, action string, target string) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}
