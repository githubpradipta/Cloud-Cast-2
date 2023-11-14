const Joi = require('@hapi/joi');

const authLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})
const authRegisterSchema = Joi.object({
    name:Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    cpassword:Joi.string().required()
})


module.exports = {
    authLoginSchema,
    authRegisterSchema
}