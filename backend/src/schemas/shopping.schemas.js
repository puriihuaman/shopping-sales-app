import { z } from 'zod';

const ShoppingSchema = z.object({
	update_date: z
		.string({
			required_error: '',
			invalid_type_error: 'The update date must be a date',
		})
		.datetime({ offset: true })
		.trim(),
	id_provider: z
		.string({
			required_error: 'Provider id is required',
			invalid_type_error: 'Provider id must be a string or a UUID',
		})
		.uuid()
		.trim(),
	id_product: z
		.string({
			required_error: 'Product id is required',
			invalid_type_error: 'Product id must be a string or a UUID',
		})
		.uuid()
		.trim(),
	amount: z
		.number({
			required_error: 'Amount is required',
			invalid_type_error: 'Amount must be a positive number',
		})
		.int()
		.positive()
		.default(0),
	purchase_value: z
		.number({
			required_error: 'Purchase value is required',
			invalid_type_error: 'Purchase value must be a positive decimal number',
		})
		.positive(),
	id_user: z
		.string({
			required_error: 'User id is required',
			invalid_type_error: 'User id must be a string or a UUID',
		})
		.uuid()
		.trim(),
});

const validateShopping = (shopping) => {
	return ShoppingSchema.safeParse(shopping);
};

const validatePartialShopping = (shopping) => {
	return ShoppingSchema.partial.safeParse(shopping);
};

export { validateShopping, validatePartialShopping };

// (id_shopping*) - update_date - id_provider - id_product - amount - purchase_value - id_user
