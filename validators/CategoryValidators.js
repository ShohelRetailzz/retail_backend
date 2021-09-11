//validator
const Joi = require('@hapi/joi');

const registrationValidation = data => {
	const schema = Joi.object({
		catName: Joi.string()
			.min(2)
			.required(),
	    email: Joi.string().email()
	    	.email({ minDomainSegments: 2 })
	    	.required(),
	    password: Joi.string()
	    	.min(6)
	    	.required()
	});

	return schema.validate(data);
}

const loginValidation = data => {
	const schema = Joi.object({
	    email: Joi.string().email()
	    	.email({ minDomainSegments: 2 })
	    	.required(),
	    password: Joi.string()
	    	.min(6)
	    	.required()
	});

	return schema.validate(data);
}

module.exports = {loginValidation, registrationValidation};