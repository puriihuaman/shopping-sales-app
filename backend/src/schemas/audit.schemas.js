import { z } from 'zod';

const AuditSchema = z.object({
	audit_date: z
		.string({
			required_error: 'Audit date is required',
			invalid_type_error: 'Audit date must be a valid date',
		})
		.datetime({
			offset: true,
			message: 'Invalid datetime string! Must be UTC',
		}),
	action: z
		.string({
			required_error: 'Action is required',
			invalid_type_error: 'Action must be a string',
		})
		.trim()
		.min(3, { message: 'Action must be 3 or more characters long' })
		.max(30, { message: 'Action must have a maximum of 30 characters' }),
	table_name: z
		.string({
			required_error: 'Table name is required',
			invalid_type_error: 'Table name must be a string',
		})
		.trim()
		.min(5, { message: 'Table name must be 5 or more characters long' })
		.max(30, { message: 'Table name must have a maximum of 30 characters' }),
	new_audit: z
		.string({
			required_error: 'New audit is required',
			invalid_type_error: 'New audit must be a string',
		})
		.trim(),
	previous: z.string({
		invalid_type_error: 'New audit must be a string',
	}),
	id_user: z
		.string({
			required_error: 'User id is required',
			invalid_type_error: 'User id must be a string or a UUID',
		})
		.uuid()
		.trim(),
});

const validateAudit = (audit) => {
	return AuditSchema.safeParse(audit);
};

const validatePartialAudit = (audit) => {
	return AuditSchema.partial().safeParse(audit);
};

export { validateAudit, validatePartialAudit };

// (id_audit*) - audit_date - action - table_name - new_audit - previous - id_user
