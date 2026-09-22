// repository se encarga de realizar las operaciones de acceso a datos, aislando al resto de la aplicación de la comunicación directa con mongo


import { Employee } from "../models/Employee.model.js";
import { EmployeeInterface } from "../models/Employee.model.js";

export class EmployeeRepository {

    //crear empleado
    async createEmployee(employees: EmployeeInterface){
        const newEmployee = await Employee.create(employees)
        return newEmployee
    }

    //traer a todos los empleados
    async getEmployees(){
        const employees = await Employee.find()
        return employees
    }

    //traer empleado por su id 
    async getEmployeeById(id: string){
        const employee = await Employee.findById(id)
        return employee
    }
}