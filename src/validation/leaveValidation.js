import Joi from "joi";

export const leaveSchema = Joi.object({
	id_leave: Joi.number().integer().positive().optional(),
	id_user: Joi.number().integer().positive().required().messages({
		"any.required": "User ID is required",
		"number.base": "User ID must be a number",
		"number.integer": "User ID must be an integer",
		"number.positive": "User ID must be a positive number",
	}),
	id_leave_type: Joi.number().integer().positive().required().messages({
		"any.required": "Leave type ID is required",
		"number.base": "Leave type ID must be a number",
		"number.integer": "Leave type ID must be an integer",
		"number.positive": "Leave type ID must be a positive number",
	}),
	start_date: Joi.date().iso().required().messages({
		"any.required": "Start date is required",
		"date.base": "Start date must be a valid date",
		"date.format": "Start date must be in ISO format",
	}),
	end_date: Joi.date().iso().required().min(Joi.ref("start_date")).messages({
		"any.required": "End date is required",
		"date.base": "End date must be a valid date",
		"date.format": "End date must be in ISO format",
		"date.min": "End date must be after or equal to start date",
	}),
	status: Joi.string()
		.valid("pending", "approved", "rejected")
		.required()
		.messages({
			"any.required": "Status is required",
			"any.only": "Status must be one of pending, approved, or rejected",
		}),
	commentary: Joi.string()
		.allow(null, "")
		.optional()
		.default("Pas de Commentaires...")
		.messages({
			"string.base": "Commentary must be a string",
		}),
});
