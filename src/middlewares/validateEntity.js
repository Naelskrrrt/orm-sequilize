// middlewares/validateLeave.js

import { leaveSchema } from "../validation/leaveValidation.js";
import { userSchema } from "../validation/userValidation.js";

export const validateLeave = (req, res, next) => {
	const { error } = leaveSchema.validate(req.body, { abortEarly: false });
	if (error) {
		const errorMessages = error.details.map((detail) => detail.message);
		return res.status(400).json({ errors: errorMessages });
	}

	next();
};

export const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body, { abortEarly: false });
	if (error) {
		const errorMessages = error.details.map((detail) => detail.message);
		return res.status(400).json({ error: errorMessages });
	}

	next();
};
