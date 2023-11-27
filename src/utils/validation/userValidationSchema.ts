import Joi from "joi";
export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    personalNumber: Joi.string().required(),
    password: Joi.string().required(),
    referenceId: Joi.string().optional(),
});