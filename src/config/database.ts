import mongoose from "mongoose";

export async function connectDatabase() {
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