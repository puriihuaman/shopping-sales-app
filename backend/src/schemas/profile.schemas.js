import { z } from 'zod';

const profileSchema = z.object({
	// code: z.string().uuid().trim(),
	profile: z
		.string({
			required_error: 'Profile profile must be a string',
			invalid_type_error: 'Profile profile is required',
		})
		.trim()
		.min(2, { message: 'Must be 2 or more characters long' }),
});

const validateProfile = (profile) => {
	return profileSchema.safeParse(profile);
};

const validatePartialProfile = (profile) => {
	return profileSchema.safeParse(profile);
};

export { validatePartialProfile, validateProfile };

// code - profile
