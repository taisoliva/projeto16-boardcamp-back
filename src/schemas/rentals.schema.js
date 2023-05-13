import joi from "joi"

export const rentalsSchema = joi.object({
    customerId: joi.number().greater(0)
})