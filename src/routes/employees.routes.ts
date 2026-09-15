    import { Router } from "express";
    import { EmployeeControllers } from "../controllers/employee.controller.js";

export class EmployeeRoutes {

    //estático para que se pueda acceder sin que haga falta crear un objeto de EmployeeRoutes
    //y el getter para usarlo como si fuese una propiedad (para no hacer EmployeeRoutes.routes basicamente)


    static get routes(): Router{


        const router = Router()

        router.get('/')



        
        return router  
    }

    }