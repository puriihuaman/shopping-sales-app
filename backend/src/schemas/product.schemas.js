import { ZodNumber, ZodObject, ZodString } from 'zod';

const productSchema = ZodObject.create({
	name: ZodString.length(60).create({
		invalid_type_error: 'Product name must be a string',
		required_error: 'Product name is required',
	}),
	amount: ZodNumber.create({
		invalid_type_error: 'Product amount must be a number',
		required_error: 'The quantity of products is required',
	})
		.int()
		.positive()
		.minValue(0)
		.default(0),
	price: ZodNumber.default(0),
	code: ZodString.create({
		invalid_type_error: 'Product code must be a string',
		required_error: 'User code for products is required',
	}),
});

const validateProduct = (product) => {
	return productSchema.safeParse(product);
};

const validatePartialProduct = (product) => {
	return productSchema.partial().safeParse(product);
};

export { validateProduct, validatePartialProduct };

// code - name - amount - price - code_user
