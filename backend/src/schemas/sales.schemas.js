import { z } from 'zod';

const SalesSchema = z.object({
	update_date: z
		.string({
			required_error: '',
			invalid_type_error: 'The update date must be a date',
		})
		.datetime({ offset: true })
		.trim(),
	id_customer: z
		.string({
			required_error: 'Customer id is required',
			invalid_type_error: 'Customer id must be a string or a UUID',
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
	sale_value: z
		.number({
			required_error: 'Sale value is required',
			invalid_type_error: 'Sale value must be a positive decimal number',
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

const validateSale = (sales) => {
	return SalesSchema.safeParse(sales);
};

const validatePartialSales = (sales) => {
	return SalesSchema.partial().safeParse(sales);
};

export { validateSale, validatePartialSales };

// (id_sale*) - update_date - id_customer - id_product - amount - sale_value - id_user
