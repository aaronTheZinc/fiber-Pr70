package auth

import "github.com/vreel/app/cache"

func IncrementLoginAttempts(email string) error {
	var err error
	num, get_err := cache.GetInt(email)
	if get_err != nil {
		err = get_err
		return err
	}
	num++
	set_err := cache.SetInt(email, num)
	if set_err != nil {
		err = set_err
	}
	return err
}
func LoginAttemptsLeft(email string) (int, error) {
	var err error
	const MaxAttempts = 5
	num, get_err := cache.GetInt(email)
	if get_err != nil {
		err = get_err
	}

	return (MaxAttempts - num), err
}
