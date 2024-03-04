import { z } from 'zod';

const ProductSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'Product name must be a string',
			required_error: 'Product name is required',
		})
		.trim()
		.min(2, { message: 'The name must be at least 2 or more characters' })
		.max(40, { message: 'The name must have a maximum of 40 characters' }),
	amount: z
		.number({
			required_error: 'Amount is required',
			invalid_type_error: 'Amount must be a number',
		})
		.int()
		.positive(),
	price: z
		.number({
			required_error: 'Price is required',
			invalid_type_error: 'Price must be a number',
		})
		.positive({ message: 'The price must be positive' }),
	id_user: z
		.string({
			required_error: 'User id is required',
			invalid_type_error: 'User id must be a string or a UUID',
		})
		.uuid()
		.trim(),
});

const validateProduct = (product) => {
	return ProductSchema.safeParse(product);
};

const validatePartialProduct = (product) => {
	return ProductSchema.partial().safeParse(product);
};

export { validateProduct, validatePartialProduct };

// (id_product*) - name - amount - price - id_user
