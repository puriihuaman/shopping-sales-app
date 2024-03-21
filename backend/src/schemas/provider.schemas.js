import { z } from 'zod';

const ProviderSchema = z.object({
	id_document: z
		.string({
			invalid_type_error: 'Provider document must be a string',
			required_error: 'Provider document is required',
		})
		.trim()
		.min(2, { message: 'The document must be at least 2 or more characters' })
		.max(20, { message: 'The document must have a maximum of 20 characters' }),
	name: z
		.string({
			invalid_type_error: 'Provider name must be a string',
			required_error: 'Provider name is required',
		})
		.trim()
		.min(2, { message: 'The name must be at least 2 or more characters' })
		.max(60),
	address: z
		.string({
			invalid_type_error: 'The provider address must be a string',
			required_error: 'Provider address is required',
		})
		.trim()
		.min(10, { message: 'The address must be at least 2 or more characters' })
		.max(200),
	phone: z
		.string({
			invalid_type_error: 'Provider phone must be a string',
			required_error: "The provider's telephone number is the one required",
		})
		.trim()
		.min(8, {
			message: 'The phone number must have at least 8 or more characters',
		})
		.max(20, {
			message: 'The phone number must have a maximum of 20 characters',
		}),
});

const validateProvider = (provider) => {
	return ProviderSchema.safeParse(provider);
};

const validatePartialProvider = (provider) => {
	return ProviderSchema.partial().safeParse(provider);
};

export { validateProvider, validatePartialProvider };

// id_provider - id_document - name - address - phone
