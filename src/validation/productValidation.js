import Joi from "joi";

const productValidation = (body) => {
	const ProductSchema = Joi.object({
		title: Joi.string().min(3).max(255).trim().required(),
		price: Joi.number().required(),
		description: Joi.string().min(5).max(510),
	});

	return ProductSchema.validate(body);
};

export default productValidation;
