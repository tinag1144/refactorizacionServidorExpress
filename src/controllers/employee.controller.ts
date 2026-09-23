import { EmployeeService } from "../service/EmployeeService.js";
import { Request, Response } from "express";

export class EmployeeControllers{

    service: EmployeeService;

    constructor(service: EmployeeService){
        this.service = service
    }


    //validaciones para crear empleado
    async createEmployee(req: Request, res: Response){
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
            return res.status(500).json({
            message: "Error interno del servidor"
        });
}
    }
    
}