import {Router} from "express"
import { getRentals, postRentals, finishRentals, deleteRentals } from "../controllers/rentals.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", postRentals)
rentalsRouter.post("/rentals/:id/return", finishRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter

