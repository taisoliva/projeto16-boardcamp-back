import joi from "joi"

export const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().greater(0),
    pricePerDay: joi.number().greater(0)

})