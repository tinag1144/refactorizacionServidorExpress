//definicion de la clase server

import express, { Application } from "express"
import mongoose from "mongoose";
import { EmployeeRoutes } from "./routes/employees.routes.js";

class Server {

    //acá pguardo app y la hago de tipo express pq va a guardar la aplicacion que crea express(), o sea es lo mismo que const app = express()
    private app:Application;

    constructor(){
        this.app = express()
    }

    
    middlewares(){
        this.app.use(express.json()) //este es un middleware de express que permite que la aplicación pueda recibir y procesar datos JSON enviados en el body de las peticiones
    }

    routes(){
        this.app.use("/employees", EmployeeRoutes.routes)
    }


    async dbConnect() {
    try {
        await mongoose.connect(
            process.env.MONGO_URI || "mongodb://localhost:27017/employees_db"
        );

        console.log("Base de datos conectada");

    } catch (error) {
        console.error("Error al conectar con la base de datos", error);
        process.exit(1);
    }
}


    listen() {
        const PORT = process.env.PORT || 3000;

        this.app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    }
}

const server = new Server();

server.middlewares();
server.routes();

server.dbConnect().then(() => {
    server.listen();
});