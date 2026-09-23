//service contiene la lógica de negocio de la aplicación y se encarga de procesar los datos y coordinar las operaciones entre el Controller y el Repository


import { EmployeeRepository } from "../repository/EmployeeRepository.js";
import { EmployeeInterface } from "../models/Employee.model.js";

export class EmployeeService {

    //creo una instancia del repositorio para que service pueda usarlo sin necesidad de hacer consultas directas a mongo
    repository: EmployeeRepository;

    constructor(repository: EmployeeRepository){
        this.repository = repository
    }

    //calculo del salario final 
    finalSalary(baseSalary: number, yearsOfService: number){

        const additional = baseSalary * 0.02 * yearsOfService
        const salarioFinal = baseSalary + additional

        return salarioFinal
    }

    async createEmployee(employee: EmployeeInterface){
        employee.finalSalary = this.finalSalary(employee.baseSalary, employee.yearsOfService)

        //uma vez que se calcula el salario, le cedo la responsabilidad a repository para que cree al empleado
        
        return await this.repository.createEmployee(employee)
    }


    async getEmployees(){
        return await this.repository.getEmployees()
    }


    async getEmployeeById(id: string){
        return await this.repository.getEmployeeById(id)
    }
}