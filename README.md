# API de Empleados

En este trabajo se refactorizó una API de empleados que originalmente tenía toda la lógica dentro de `server.ts`.

La idea fue separar las responsabilidades en diferentes carpetas para que cada parte del proyecto se encargue de algo específico.

## Estructura

```text
src/
├── controllers/
├── models/
├── routes/
├── repository/
├── service/
├── errorHandler/
└── server.ts
```

### ¿Qué hace cada parte?

* **Models:** define la estructura de los empleados en MongoDB.
* **Repository:** se encarga de las consultas y operaciones con MongoDB.
* **Service:** contiene la lógica de negocio, como el cálculo del salario final.
* **Controller:** recibe las peticiones, valida los datos y devuelve las respuestas.
* **Routes:** conecta las rutas con los Controllers.
* **ErrorHandler:** centraliza el manejo de errores.
* **Server:** configura Express, MongoDB, middlewares y rutas.

## Endpoints

### Crear empleado

```http
POST /employees
```

Ejemplo:

```json
{
    "name": "Juan",
    "position": "Developer",
    "baseSalary": 100000,
    "yearsOfService": 3
}
```

El `finalSalary` se calcula automáticamente agregando un 2% del salario base por cada año de antigüedad.

### Obtener empleados

```http
GET /employees
```

Devuelve todos los empleados guardados.

### Obtener empleado por ID

```http
GET /employees/:id
```

Devuelve el empleado correspondiente al ID.

## SOLID

Durante la refactorización se aplicaron los principios SOLID principalmente mediante la separación de responsabilidades y la inyección de dependencias.

### S - Single Responsibility

Se aplicó separando las responsabilidades en diferentes archivos.

* `controllers/employee.controller.ts`: se encarga de recibir las peticiones, validar los datos y enviar las respuestas.
* `service/EmployeeService.ts`: se encarga de la lógica de negocio, como calcular el salario final.
* `repository/EmployeeRepository.ts`: se encarga de las operaciones con MongoDB.
* `models/Employee.model.ts`: define la estructura de los empleados.
* `routes/employee.routes.ts`: se encarga de definir las rutas.
* `server.ts`: configura y pone en funcionamiento la aplicación.

De esta manera, cada parte tiene una responsabilidad específica y no tenemos toda la lógica mezclada en un solo archivo.

### O - Open/Closed

Se aplicó al separar las diferentes capas.

Por ejemplo, si queremos agregar una nueva operación relacionada con empleados, podemos agregar un método en el Service o Repository correspondiente sin tener que volver a poner toda la lógica dentro de `server.ts`.

La estructura permite agregar funcionalidades manteniendo separadas las responsabilidades que ya existen.

### L - Liskov Substitution

Este principio no tiene una aplicación directa en este proyecto porque no utilizamos una jerarquía de clases con herencia donde una clase tenga que reemplazar a otra.

Por eso no fue necesario forzar una aplicación de este principio.

### I - Interface Segregation

Se aplicó en `models/Employee.model.ts`, donde `EmployeeInterface` contiene solamente los datos que necesitamos recibir para crear un empleado:

```ts id="e5o4lz"
export interface EmployeeInterface {
    name: string;
    position: string;
    baseSalary: number;
    yearsOfService: number;
}
```

`finalSalary` no está incluido porque no es un dato que ingresa el usuario. Ese valor es calculado por el Service.

Así evitamos que la interfaz tenga datos que no son necesarios para esa operación.

### D - Dependency Inversion

Se aplica principalmente en `service/EmployeeService.ts`.

El Service no crea directamente su Repository, sino que lo recibe mediante el constructor:

```ts id="3wh0y4"
constructor(repository: EmployeeRepository) {
    this.repository = repository;
}
```

Después, en `routes/employee.routes.ts`, se conectan las dependencias:

```ts id="2fkw91"
const repository = new EmployeeRepository();
const service = new EmployeeService(repository);
const controller = new EmployeeControllers(service);
```

De esta forma:

```text id="6v1j2c"
Repository
    ↓
Service
    ↓
Controller
    ↓
Routes
```

Cada capa recibe la dependencia que necesita en lugar de encargarse de crearla internamente. Esto hace que las partes del proyecto estén más desacopladas y sean más fáciles de modificar o probar.


## Docker

MongoDB se ejecuta mediante Docker Compose.

Para levantar la base de datos:

```bash
docker compose up -d
```

Y para iniciar la API:

```bash
npm run dev
```

Las pruebas de los endpoints se realizaron con Postman y se comprobó que los empleados se guardan correctamente en MongoDB.
