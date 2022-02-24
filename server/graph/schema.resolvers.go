package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/vreel/app/auth"
	"github.com/vreel/app/database"
	"github.com/vreel/app/graph/generated"
	"github.com/vreel/app/graph/model"
)

func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (*model.User, error) {
	user, err := auth.CreateNewUser(input)
	return &user, err
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

func (r *mutationResolver) Group(ctx context.Context, id string) (*model.Group, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) User(ctx context.Context, id *string) (*model.User, error) {
	user, err := database.GetUser(*id)
	return &user, err
}

func (r *queryResolver) Username(ctx context.Context, username *string) (*model.User, error) {
	user, err := database.GetUserByUsername(*username)

	return &user, err
}

func (r *queryResolver) Login(ctx context.Context, input *model.LoginInput) (*model.LocalSession, error) {
	localSession, err := auth.Login(input.Email, input.Password)
	return &localSession, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
