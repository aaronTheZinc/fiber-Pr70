package utils

func RemoveStringFromSlice(slice []string, val string) []string {

	for i, v := range slice {
		if v == val {
			return append(slice[:i], slice[i+1:]...)
		}
	}
	return slice
}
