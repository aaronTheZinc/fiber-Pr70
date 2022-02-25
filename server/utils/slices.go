package utils

func RemoveDuplicateStringFromSlice(slice []string, val string) []string {

	for i, v := range slice {
		if v == val {
			return append(slice[:i], slice[i+1:]...)
		}
	}
	return slice
}

func ItemExistsInStringSlice(target string, slice []string) bool {
	exists := false
	for _, i := range slice {
		if i == target {
			exists = true
		}
	}
	return exists
}

func RemoveStringFromSlice(s []string, r string) []string {
	for i, v := range s {
		if v == r {
			return append(s[:i], s[i+1:]...)
		}
	}
	return s
}
