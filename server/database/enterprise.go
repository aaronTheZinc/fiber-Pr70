package database

import (
	"log"
	"sync"

	e "github.com/vreel/app/err"
	"github.com/vreel/app/graph/model"
	"github.com/vreel/app/utils"
)

func GetEnterprise(id string) (model.Enterprise, error) {
	var enterprise model.EnterpriseModel
	var response model.Enterprise
	var err error
	fetchErr := db.Where("id = ?", id).First(&enterprise).Error
	if fetchErr != nil {
		err = e.ENTERPRISE_NOT_FOUND
	}
	employees, _ := GetEnterpriseEmployees(id)

	if vreel, get_err := GetVreel(id); get_err != nil {
		err = e.VREEL_NOT_FOUND
	} else {
		r := enterprise.ToEnterprise(employees)
		r.Vreel = &vreel

		response = r
	}

	return response, err
}

func CreateEnterprise(owner string, e model.NewEnterprise) (model.Enterprise, error) {
	enterprise := e.ToModel()
	enterprise.ID = utils.GenerateId()
	enterprise.Owner = owner
	err := db.Create(&enterprise).Error

	return enterprise.ToEnterprise([]*model.User{}), err
}

func AddEmployeeToEnterprise(enterpriseId, newUserId string) error {
	var enterprise model.EnterpriseModel
	log.Println("attempting to add user!")
	err := db.Where("id = ?", enterpriseId).First(&enterprise).Error
	if err == nil {
		employees := enterprise.Employees
		employees = append(employees, newUserId)

		log.Println("[employee id]", employees)
		f := db.Model(&enterprise).Where("id = ?", enterpriseId).Update("employees", employees).Error

		if f != nil {
			err = e.ENTERPRISE_FAILED_ADD_EMPLOYEE
		}
	}
	return err
}
func GetEnterpriseByOwner(id string) (model.Enterprise, error) {
	var enterprise model.EnterpriseModel
	var employees []*model.User
	var err error

	if findErr := db.Where("owner = ?", id).First(&enterprise).Error; findErr != nil {
		err = findErr
	} else {
		if e, get_err := GetEnterpriseEmployees(enterprise.ID); get_err != nil {
			err = get_err
		} else {
			employees = e
		}
	}
	return enterprise.ToEnterprise(employees), err
}
func RemoveEmployeeFromEnterprise() {

}

func GetEnterpriseEmployees(id string) ([]*model.User, error) {
	var employees []*model.User
	enterprise := model.EnterpriseModel{}

	err := db.Where("id = ?", id).First(&enterprise).Error
	if err == nil {
		wg := sync.WaitGroup{}
		for _, e := range enterprise.Employees {
			o := e
			wg.Add(1)
			go func() {
				defer wg.Done()
				employeeId := o
				employee := model.UserModel{}
				if r := db.Where("id = ?", employeeId).First(&employee).Error; r == nil {
					v := employee.ToUser()
					employees = append(employees, &v)
				} else {
					log.Panicln("[failed to retrieve employee]" + employeeId)
				}

			}()
		}
		wg.Wait()
	}
	return employees, err
}

func GetAllEnterprises() ([]model.Enterprise, error) {
	var enterprises []model.EnterpriseModel
	var r []model.Enterprise
	err := db.Find(&enterprises)

	for _, v := range enterprises {
		o := v
		e, _ := GetEnterpriseEmployees(o.ID)
		r = append(r, o.ToEnterprise(e))
	}

	return r, err.Error
}
