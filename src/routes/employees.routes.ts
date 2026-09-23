    import { Request, Response, NextFunction, Router } from "express";
    import { EmployeeControllers } from "../controllers/employee.controller.js";
    import { EmployeeRepository } from "../repository/EmployeeRepository.js";
    import { EmployeeService } from "../service/EmployeeService.js";

export class EmployeeRoutes {

    //estático para que se pueda acceder sin que haga falta crear un objeto de EmployeeRoutes
    //y el getter para usarlo como si fuese una propiedad (para no hacer EmployeeRoutes.routes basicamente)


    static get routes(): Router{

        //conecto las distintas capas de la aplicación mediante dependencias, el repository se encarga de acceder a mongo, el service utiliza el repository para realizar la logica del negocio y controller utiliza service para manejar las peticiones 
        const router = Router()

        const repository = new EmployeeRepository();
        const service = new EmployeeService(repository);
        const controller = new EmployeeControllers(service);


        //POST 
        router.post('/', (req: Request, res: Response, next: NextFunction) => controller.createEmployee(req, res, next))

        //GET all employees
        router.get('/', (req: Request, res: Response, next: NextFunction) => controller.getEmployees(res, next));

        //GET employee by id 
        router.get('/:id', (req: Request, res: Response, next: NextFunction) => controller.getEmployeeById(req, res, next))

        


        
        return router  
    }

    }