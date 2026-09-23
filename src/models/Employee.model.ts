import { model, Schema } from "mongoose";

//añado la interfaz de Employee para definir la estructura de los datos que se usaran, y el Schem se encarga unicamente de definir como se validan y guardan los datos en mongoDB
export interface EmployeeInterface {
    name: string;
    position: string;
    baseSalary: number;
    yearsOfService: number;
}

const employeeSchema = new Schema({

    name: { 
        type: String, 
        required: true 
    },
    position: {
        type: String, 
        required: true 
    },
    baseSalary: { 
        type: Number, 
        required: true 
    },
    yearsOfService: { 
        type: Number, 
        required: true 
    },
    finalSalary: { 
        type: Number, 
        required: true 
    }
}, { 
    timestamps: true 
}
);

export const Employee = model('Employee', employeeSchema);