const Joi = require('@hapi/Joi');


const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const itemValidation = (data) => {
    const schema = Joi.object({
        category: Joi.string().min(6).required(),
        title: Joi.string().min(25).required(),
        highlights: Joi.array().min(1).required().items(Joi.string())
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.itemValidation = itemValidation;