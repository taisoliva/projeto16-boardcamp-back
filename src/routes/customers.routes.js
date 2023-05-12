import {Router} from "express"
import {getClientes, postClientes, 
        buscarClientes, updateClientes} from "../controllers/customers.controller.js"
import {customersSchema} from "../schemas/customers.schema.js" 
import { validateSchema } from "../middlewares/validateSchema.middleware.js"


const customersRouter =  Router()

customersRouter.get("/customers", getClientes)
customersRouter.get("/customers/:id", buscarClientes)
customersRouter.post("/customers", validateSchema(customersSchema),postClientes)
customersRouter.put("/customers/:id", validateSchema(customersSchema),updateClientes)

export default customersRouter