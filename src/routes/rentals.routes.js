import {Router} from "express"
import { getRentals, postRentals, finishRentals, deleteRentals } from "../controllers/rentals.controller"
import { validateSchema } from "../middlewares/validateSchema.middleware"