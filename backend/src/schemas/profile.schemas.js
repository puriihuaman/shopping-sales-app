import { z } from 'zod';

const profileSchema = z.object({
	// code: z.string().uuid().trim(),
	profile: z
		.string({
			required_error: 'The profile field is required',
			invalid_type_error: 'The profile field must be a string',
		})
		.trim()
		.min(2, { message: 'Must be 2 or more characters long' }),
});

const validateProfile = (profile) => {
	return profileSchema.safeParse(profile);
};

const validatePartialProfile = (profile) => {
	return profileSchema.partial().safeParse(profile);
};

export { validatePartialProfile, validateProfile };

// code - profile
