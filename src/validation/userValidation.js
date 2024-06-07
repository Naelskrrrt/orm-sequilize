// validations/userValidation.js

import Joi from "joi";

export const userSchema = Joi.object({
	firstName: Joi.string().optional(),
	lastName: Joi.string().required().messages({
		"any.required": "Last name is required",
		"string.base": "Last name must be a string",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "Email is required",
		"string.email": "Must be a valid email",
	}),
	jobTitle: Joi.string().required().messages({
		"any.required": "Job title is required",
		"string.base": "Job title must be a string",
	}),
	leave_solde: Joi.number().integer().min(0).required().messages({
		"any.required": "Leave solde is required",
		"number.base": "Leave solde must be an integer",
		"number.min": "Leave solde must be greater than or equal to 0",
	}),
	password: Joi.string().required().min(8).messages({
		"any.required": "Password is required",
		"string.base": "Password must be a string",
		"string.min": "Password must be more strong (words > 8)",
	}),
	role_id: Joi.number().required().messages({
		"any.required": "Role ID is required",
	}),
});

// validations/leaveValidation
