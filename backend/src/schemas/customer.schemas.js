import { z } from 'zod';

const CustomerSchema = z.object({
	id_document: z
		.string({
			invalid_type_error: 'Customer document must be a string',
			required_error: "The client's document is required",
		})
		.trim()
		.min(2, { message: 'The document must be at least 2 or more characters' })
		.max(20, { message: 'The document must have a maximum of 20 characters' }),
	name: z
		.string({
			invalid_type_error: 'Customer name must be a string',
			required_error: 'Customer name is required',
		})
		.trim()
		.min(2, { message: 'The name must be at least 2 or more characters' })
		.max(60),
	address: z
		.string({
			invalid_type_error: 'The client address must be a string',
			required_error: 'Customer address is required',
		})
		.trim()
		.min(10, { message: 'The address must be at least 2 or more characters' })
		.max(200),
	phone: z
		.string({
			invalid_type_error: 'Customer phone must be a string',
			required_error: "The customer's phone number is the one required",
		})
		.trim()
		.min(8, {
			message: 'The phone number must have at least 8 or more characters',
		})
		.max(20, {
			message: 'The phone number must have a maximum of 20 characters',
		}),
});

const validateCustomer = (customer) => {
	return CustomerSchema.safeParse(customer);
};

const validatePartialCustomer = (customer) => {
	return CustomerSchema.partial().safeParse(customer);
};

export { validateCustomer, validatePartialCustomer };

// (id_customer*) - id_document - name - address - phone
