package err

import "errors"

var UNAUTHORIZED_ERROR error = errors.New("user not authorized")
var INVALID_TOKEN error = errors.New("invalid token")
var USER_NOT_FOUND error = errors.New("user not found")
var GROUP_NOT_FOUND error = errors.New("group not found")
var FAILED_TO_SAVE error = errors.New("failed to save changes")
var USER_UPDATE_FAILED error = errors.New("user failed to upate")
var GROUP_UPDATE_FAILED error = errors.New("group failed to upate")
var GROUP_DELETE_FAILED error = errors.New("failed to delete group")
var USER_IN_GROUP error = errors.New("user exists in group")
var USER_NOT_IN_GROUP error = errors.New("user does not exist in group")
var FAILED_EVENT_CREATE error = errors.New("failed to create event")
var FAILED_GET_USERNAME error = errors.New("failed to fetch all usernames")
