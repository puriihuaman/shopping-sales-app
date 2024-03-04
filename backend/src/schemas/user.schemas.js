import { z } from 'zod';

const userSchema = z.object({
	name_user: z
		.string({
			invalid_type_error: 'User name_user must be a string',
			required_error: 'User name_user is required',
		})
		.trim()
		.min(2, { message: 'Must be 2 or more characters long' })
		.max(40),
	lastname: z
		.string({
			invalid_type_error: 'User lastname must be a string',
			required_error: 'User lastname is required',
		})
		.trim()
		.min(2, { message: 'Must be 2 or more characters long' }),
	email: z
		.string({
			invalid_type_error: 'User username must be a string',
			required_error: 'User username is required',
		})
		.trim()
		.email({ message: 'Invalid email address' })
		.max(60),
	username: z
		.string({
			invalid_type_error: 'User username must be a string',
			required_error: 'User username is required',
		})
		.trim()
		.min(5, { message: 'Must be 5 or more characters long' }),
	password: z
		.string({
			invalid_type_error: 'User password must be a string',
			required_error: 'User password is required',
		})
		.trim()
		.min(10, { message: 'Must be 10 or more characters long' })
		.max(32),
	id_profile: z
		.string({
			invalid_type_error: 'The profile id for user must be a string',
			required_error: 'Profile id required for user',
		})
		.trim()
		.toLowerCase(),
});

const validateUser = (user) => {
	return userSchema.safeParse(user);
};

const validatePartialUser = (user) => {
	return userSchema.partial().safeParse(user);
};

export { validateUser, validatePartialUser };

// code - name_user - lastname - email - username - password - code_profile
