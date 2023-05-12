import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
    birthday: joi.string().isoDate().required()
})