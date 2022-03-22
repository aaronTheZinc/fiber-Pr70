package utils

import "errors"

func ContentTypeHandler(c string) (string, error) {
	var e error
	var s string
	switch c {
	case "jpg":
		s = "image"
	case "jpeg":
		s = "image"
	case "png":
		s = "image"
	case "mp4":
		s = "video"
	default:
		e = errors.New("")
	}
	return s, e
}
