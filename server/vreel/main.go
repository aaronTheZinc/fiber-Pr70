package vreel

import (
	// "github.com/vreel/app/database"
	"github.com/vreel/app/graph/model"
)

func DefaultVreel() model.Vreel {
	return model.Vreel{}
}

// func EditVreel(userId string, f []model.VreelFields) (model.MutationResponse, error) {
// 	var err error
// 	var fieldErrs []string = []string{}
// 	var r model.MutationResponse

// 	for _, i := range f {
// 		if !VreelFieldExits(i.Field) {
// 			fieldErrs = append(fieldErrs, i.Field)
// 		}
// 	}
// 	if len(fieldErrs) > 0 {
// 		//handle invalid field changes
// 		err = errors.New(strings.Join(fieldErrs[:], ","))
// 	} else {
// 		for _, v := range f {
// 			go database.UpdateVreelElements(userId, v.Field)
// 		}
// 	}
// 	// if VreelFieldExits() {

// 	// }

// 	return r, err
// }
