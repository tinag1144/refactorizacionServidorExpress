import { EmployeeService } from "../service/EmployeeService.js";
import { NextFunction, Request, Response } from "express";

export class EmployeeControllers{

    service: EmployeeService;

    constructor(service: EmployeeService){
        this.service = service
    }


    //validaciones para crear empleado
    async createEmployee(req: Request, res: Response, next: NextFunction){
        try {
            const {
                name,
                position,
                baseSalary,
                yearsOfService
            } = req.body;

            if (!name || !position) {
                return res.status(400).json({message:
                    "Nombre y puesto son obligatorios"
                });
            }
            if (typeof baseSalary !== 'number' || baseSalary <= 0) {
                return res.status(400).json({message: "El salario base debe ser mayor a 0"})
            }
            if (typeof yearsOfService !== 'number' 
                || !Number.isInteger(yearsOfService) 
                || yearsOfService < 0
            ) {
                return res.status(400).json({
                    message: "La antigüedad debe ser un entero mayor o igual a 0"
                })
            }

            const employee = await this.service.createEmployee({
                name,
                position,
                yearsOfService,
                baseSalary
            });

            return res.status(201).json(employee);
        } catch (error) {
            next(error)
}
    }

    //validaciones para traer a todos los empleados

    async getEmployees(res: Response, next: NextFunction){

        try {
            const employees = await this.service.getEmployees()
            return res.status(200).json(
                employees
            )
        } catch (error) {
            next(error)
        }
    }
    async getEmployeeById(req: Request, res: Response, next: NextFunction){

        const id = String(req.params.id) //acá convierto el id a string (no entendí bien por qué, corregí un error nada más)


        try {
            const employee = await this.service.getEmployeeById(id)

            if (!employee){
                return res.status(404).json({
                    message: "Empleado no encontrado"
                })
            }
            return res.status(200).json(
                employee
            )
        } catch (error) {
            next(error)
        }
    }
}