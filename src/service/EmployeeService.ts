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

        //saqué el finalSalary de la interfaz porque no es un dato que el usuario deberia de ingresar, ahora lo calculo directamente en service y creo un objeto con ese valor        
        const finalSalary = this.finalSalary(
        employee.baseSalary,
        employee.yearsOfService
    );

    //y acá creo un nuevo objeto con la informacion de employee y le agrego el calculo del salario final para poder mandarselo a repository

        const employeeWithSalary = {
        ...employee,
        finalSalary
    };

        return await this.repository.createEmployee(employeeWithSalary)
    }


    async getEmployees(){
        return await this.repository.getEmployees()
    }


    async getEmployeeById(id: string){
        return await this.repository.getEmployeeById(id)
    }
}