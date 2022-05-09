package err

import "errors"

var UNAUTHORIZED_ERROR error = errors.New("user not authorized")
var INVALID_TOKEN error = errors.New("invalid token")
var USER_NOT_FOUND error = errors.New("user not found")
var GROUP_NOT_FOUND error = errors.New("group not found")
var VREEL_NOT_FOUND error = errors.New("vreel not found")
var ENTERPRISE_NOT_FOUND error = errors.New("enterprise not found")
var FAILED_TO_SAVE error = errors.New("failed to save changes")
var USER_UPDATE_FAILED error = errors.New("user failed to upate")
var GROUP_UPDATE_FAILED error = errors.New("group failed to upate")
var GROUP_DELETE_FAILED error = errors.New("failed to delete group")
var USER_IN_GROUP error = errors.New("user exists in group")
var USER_NOT_IN_GROUP error = errors.New("user does not exist in group")
var FAILED_EVENT_CREATE error = errors.New("failed to create event")
var FAILED_ENTERPRISE_CREATE error = errors.New("failed to create vreel")
var FAILED_GET_USERNAME error = errors.New("failed to fetch all usernames")
var FAILED_SLIDE_CREATE error = errors.New("failed to create slide")
var EMAIL_IN_USE error = errors.New("email is in use")
var USERNAME_IN_USE error = errors.New("username is in use")
var FAILED_CREATE_VREEL error = errors.New("failed to create vreel")
var FAILED_CREATE_USER error = errors.New("failed to create user")
var FAILED_VREEL_UPDATE error = errors.New("failed to update vreel")
var SLIDE_NOT_FOUND error = errors.New("slide not found")
var ELEMENT_NOT_FOUND error = errors.New("element not found")
var FAILED_USER_UPDATE error = errors.New("user failed to update")
var INVALID_ACCOUNT_TYPE error = errors.New("invalid account type")
var ENTERPRISE_FAILED_ADD_EMPLOYEE error = errors.New("failed to add employee to enterprise")
var FAILED_TO_PARSE_SLIDE error = errors.New("failed to parse slide")
var FAILED_UPDATE_SLIDE error = errors.New("failed to update slide")
var FAILED_LIKE_CREATE error = errors.New("failed to create like")
var ANALYTICS_FRAGMENT_NOT_FOUND = errors.New("analytics fragment not found")
var FAILED_REMOVE_LIKE = errors.New("failed to remove like")

func VreelFieldError(field string) error {
	return errors.New("vreel field: " + field)
}
