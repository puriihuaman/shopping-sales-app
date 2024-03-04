import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class ProfileModel {
	static async getAll() {
		const query = 'SELECT * FROM profiles';

		const client = await pool.connect();

		try {
			const result = await client.query(query);

			if (result.rowCount === 0) {
				// error al obtener profiles
				// no se pudo obtener los perfiles
				throw new ClientError(
					'error getting profiles',
					400,
					'could not get profiles'
				);
			}

			return {
				message: 'profiles successfully obtained',
				obtainedProfile: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else {
				// Otro tipo de error inesperado
				throw new ServerError('Internal server error', 500);
			}
		} finally {
			await client.end();
		}
	}

	static async getById({ id }) {
		const selectionQuery = 'SELECT * FROM profiles WHERE id_profile = $1;';

		const client = await pool.connect();

		try {
			const result = await client.query(selectionQuery, [id]);

			if (result.rowCount === 0) {
				// no se encontró ningún perfil con ese ID
				throw new ClientError(
					'invalid ID',
					404,
					'no profile found with that ID'
				);
			}

			return {
				message: 'profile successfully obtained',
				obtainedProfile: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			}

			// Otro tipo de error inesperado
			throw new ServerError('Internal server error', 500);
		} finally {
			await client.end();
		}
	}

	static async createProfile({ input }) {
		const { profile } = input;
		const insertQuery =
			'INSERT INTO profiles (id_profile, profile) VALUES ($1, $2) RETURNING *;';
		const idProfile = randomUUID();

		const client = await pool.connect();

		try {
			const result = await client.query(insertQuery, [idProfile, profile]);

			if (result.rowCount === 0) {
				// no se pudo registrar el perfil
				throw new ClientError(
					'error registering',
					400,
					'profile could not be registered'
				);
			}

			return {
				message: `${profile} profile registered successfully`,
				insertedProfile: true,
				status: 201,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else if (error.code === '23505' && error.constraint === 'uk_profiles') {
				// el perfil '' ya existe
				// ya existe el perfil. Por favor, intente con otro nombre de perfil
				throw new ClientError(
					`${profile} profile already exists`,
					409,
					'the profile already exists. Please try another profile name'
				);
			} else {
				// error al registrar perfil
				throw new ServerError('error when registering profile', 500, '');
			}
		} finally {
			await client.end();
		}
	}

	static async deleteProfile({ id }) {
		const deleteQuery =
			'DELETE FROM profiles WHERE id_profile = $1 RETURNING *;';

		const client = await pool.connect();

		try {
			const result = await client.query(deleteQuery, [id]);

			if (result.rowCount === 0) {
				// id invalido
				// no se encontró ningún perfil con ese ID
				throw new ClientError(
					'invalid ID',
					404,
					'no profile found with that ID'
				);
			}

			return {
				message: 'profile deleted successfully',
				deletedProfile: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			}

			// Otro tipo de error inesperado
			throw new ServerError('Internal server error', 500, '');
		} finally {
			await client.end();
		}
	}

	static async updateProfile({ id, input }) {
		const updateQuery =
			'UPDATE profiles SET profile = COALESCE($1, profile) WHERE id_profile = $2 RETURNING *;';

		const { profile } = input;

		const client = await pool.connect();

		try {
			const result = await client.query(updateQuery, [profile, id]);

			if (result.rowCount === 0) {
				// id invalido
				// no se encontró ningún perfil con ese ID
				throw new ClientError(
					'invalid ID',
					404,
					'no profile found with that ID'
				);
			} else if (result.rows[0].profile === profile) {
				// El perfil '' ya está registrado.
				// El nuevo perfil es igual al perfil existente, no es necesario actualizar
				throw new ClientError(
					`the ${profile} profile already exists`,
					400,
					'New profile is the same as the existing one'
				);
			}

			return {
				message: 'profile updated successfully',
				updatedProfile: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else if (error.code === '23505' && error.constraint === 'uk_profiles') {
				// El perfil '' ya está registrado.
				// ya existe el perfil. Por favor, intente con otro nombre de perfil
				throw new ClientError(
					`the ${profile} profile already exists`,
					409,
					'the profile already exists. Please try another profile name'
				);
			} else {
				throw new ServerError('error updating profile', 500, '');
			}
		} finally {
			await client.end();
		}
	}
}
