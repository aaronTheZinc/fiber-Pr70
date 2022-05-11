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

func GetEnterpiseByOwner(owner string) (model.Enterprise, error) {
	log.Println(owner)
	var err error
	var enterprise_m model.EnterpriseModel
	var enterprise model.Enterprise

	if getErr := db.Where("owner = ?", owner).First(&enterprise_m).Error; getErr == nil {
		log.Println("here ->", enterprise_m.ID, owner)
		if e, err_ := GetEnterprise(enterprise_m.ID); err_ == nil {
			enterprise = e
		} else {

			err = err_
		}
	}

	return enterprise, err
}

func GetEnterpriseIdByName(name string) (string, error) {
	var enterprise model.EnterpriseModel
	err := db.Where("name = ? ", name).First(&enterprise).Error
	return enterprise.ID, err
}

func GetEnterpriseByName(name string) (model.Enterprise, error) {
	var enterprise model.EnterpriseModel
	var response model.Enterprise
	var err error
	fetchErr := db.Where("name = ?", name).First(&enterprise).Error
	if fetchErr != nil {
		err = e.ENTERPRISE_NOT_FOUND
	}
	employees, _ := GetEnterpriseEmployees(enterprise.ID)

	if vreel, get_err := GetVreel(enterprise.ID); get_err != nil {
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
	err := db.Where("id = ?", enterpriseId).First(&enterprise).Error
	if err == nil {
		employees := enterprise.Employees
		employees = append(employees, newUserId)

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

func GetEenterpriseEmployee(enterpriseName, employeeId string) (model.EnterpriseEmployee, error) {
	var employee model.EnterpriseEmployee
	var err error
	var user model.User
	var vreel model.Vreel

	wg := sync.WaitGroup{}

	if entId, fetchErr := GetEnterpriseIdByName(enterpriseName); fetchErr != nil {
		err = e.ENTERPRISE_NOT_FOUND
	} else {
		//get vreel
		wg.Add(1)
		go func() {
			defer wg.Done()
			if v, fetchErr := GetVreel(entId); fetchErr != nil {
				err = fetchErr
			} else {
				vreel = v
			}
		}()
		//get user
		wg.Add(1)
		go func() {
			defer wg.Done()
			if u, fetchErr := GetUser(employeeId); fetchErr != nil {
				err = fetchErr
			} else {
				user = u
			}

		}()
		wg.Wait()

		if err == nil {
			employee = model.EnterpriseEmployee{
				Employee: &user,
				Vreel:    &vreel,
			}
		}

	}
	return employee, err
}
