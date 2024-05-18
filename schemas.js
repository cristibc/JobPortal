const Joi = require('joi').extend(require('@joi/date'));

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    role: Joi.string()
        .valid('GUEST', 'USER', 'COMPANY', 'ADMIN'),

    password: Joi.string()
        .min(3)
        .max(72)
        .required(),

    // 2024-05-12T22:15:46.506+00:00
    createdAt: Joi.date().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
});

const updateUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    email: Joi.string()
        .email(),

    role: Joi.string()
        .valid('GUEST', 'USER', 'COMPANY', 'ADMIN'),

    password: Joi.string()
        .min(3)
        .max(72),

    // 2024-05-12T22:15:46.506+00:00
    createdAt: Joi.date().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
});

const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(3)
        .max(72)
        .required(),
});

const companySchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),

    description: Joi.string()
        .required()
        .min(1)
        .max(250)
        .required(),

    // 2024-05-12T22:15:46.506+00:00
    createdAt: Joi.date().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
});

module.exports = {
    'register': registerSchema,
    'login': loginSchema,
    'addCompany': companySchema,
    'updateUser': updateUserSchema,
}