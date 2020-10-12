const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: passwordComplexity(complexityOptions)
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

const eventValidation = (data) => {
    const schema = Joi.object({
        category: Joi.string().min(4).required(),
        title: Joi.string().min(10).max(255).required(),
        highlights: Joi.array().min(1).required().items(Joi.string()),
        tags: Joi.array().min(1).required().items(Joi.string()),
        references: Joi.array().items(Joi.string())
    });
    return schema.validate(data);
}

const eventTypeValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(25).required(),
        isActive: Joi.boolean()
    });
    return schema.validate(data);
}

const menuItemValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(25).required(),
        isActive: Joi.boolean(),
        component: Joi.string().min(3).max(25).required()
    });
    return schema.validate(data);
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.eventValidation = eventValidation;
module.exports.eventTypeValidation = eventTypeValidation;
module.exports.menuItemValidation = menuItemValidation;