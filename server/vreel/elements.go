package vreel

import (
	e "github.com/vreel/app/err"
)

func EditElement(token, element, key, value string) error {
	var err error
	switch element {
	case "@contact":
		switch key {
		case "":
		default:
			err = e.VreelFieldError(key)
			break
		}
	default:
		err = e.ELEMENT_NOT_FOUND

	}
	return err
}
