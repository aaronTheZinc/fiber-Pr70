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

func (r *mutationResolver) CreateEvent(ctx context.Context, token string, input model.NewEvent) (*model.Event, error) {
	event, err := auth.CreateEvent(token, input)
	return &event, err
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

func (r *mutationResolver) DeleteGroup(ctx context.Context, id string, token string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteGroup(token, id)
	return &resp, err
}

func (r *mutationResolver) AddUserToGroup(ctx context.Context, token string, groupID string, userID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddUserToGroup(token, groupID, userID)

	return &resp, err
}

func (r *mutationResolver) AddEmployeeToEnterprise(ctx context.Context, token string, newUser model.NewUser) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeAddEmployeeToEnterprise(token, newUser)

	return &resp, err
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
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) LogPageLoad(ctx context.Context, vreelID string) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) EditFileName(ctx context.Context, token string, newName string, fileID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeEditFileName(token, fileID, newName)
	return &resp, err
}

func (r *mutationResolver) DeleteFile(ctx context.Context, token string, fileID string) (*model.MutationResponse, error) {
	resp, err := auth.AuthorizeDeleteFile(token, fileID)

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
func (r *mutationResolver) AnalyticsUpdate(ctx context.Context, token string, action string, target string) (*model.MutationResponse, error) {
	panic(fmt.Errorf("not implemented"))
}
