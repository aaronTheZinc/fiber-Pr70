package vreel

import "github.com/vreel/app/utils"

func VreelFieldExits(f string) bool {
	var fields []string = []string{}
	return utils.ItemExistsInStringSlice(f, fields)
}
