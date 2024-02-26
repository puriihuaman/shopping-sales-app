import { pool } from '../databases/connection.js';
import { randomUUID } from 'node:crypto';

export class ProfileModel {
	static async getAll() {
		const query = 'SELECT * FROM profiles';

		const client = await pool.connect();
		const result = await client.query(query);

		await client.end();
		return result.rows;
	}

	static async getById({ id }) {
		const selectionQuery = 'SELECT * FROM profiles WHERE id_profile = $1;';

		const client = await pool.connect();

		try {
			const result = await client.query(selectionQuery, [id]);

			if (result.rowCount === 0 && result.rows.length === 0) {
				throw new Error('could not get profile');
			}

			return {
				message: 'profile successfully obtained',
				obtainedProfile: true,
				dataRecords: result.rows[0],
				error: null,
			};
		} catch (error) {
			return {
				message: error.message,
				obtainedProfile: false,
				dataRecords: [],
				error,
			};
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

			if (result.rowCount !== 1 && result.command !== 'INSERT') {
				throw new Error('could not insert profile');

				// return {
				// 	insertedProfile: false,
				// 	dataRecords: [],
				// 	error: 'could not insert profile', //No se pudo insertar el perfil
				// };
			}

			return {
				message: 'profile registered successfully', // perfil registrado exitosamente
				insertedProfile: true,
				dataRecords: result.rows[0],
				error: null,
			};
		} catch (error) {
			if (error.code === '23505' && error.constraint === 'uk_profiles') {
				return {
					message:
						'the profile already exists. Please choose another profile name',
					insertedProfile: false,
					dataRecords: [],
					error,
				};
				// El perfil ya existe. Por favor, elija otro nombre de perfil
			}

			return {
				message: 'error inserting profile', // Error al insertar el perfil
				insertedProfile: false,
				dataRecords: [],
				error,
			};
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

			if (result.rowCount === 0 && result.rows.length === 0) {
				throw new Error('could not delete profile');
				// return {
				// 	message: 'error deleting profile',
				// 	deletedProfile: false,
				// 	dataRecords: [],
				// 	error: 'could not delete profile', //No se pudo eliminar el perfil
				// };
			}

			return {
				message: 'profile deleted successfully',
				deletedProfile: true,
				dataRecords: result.rows[0],
				error: null,
			};
		} catch (error) {
			return {
				message: error.message,
				deletedProfile: false,
				dataRecords: [],
				error,
			};
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
			console.log(result);

			if (result.rowCount === 0 && result.rows.length === 0) {
				throw new Error('Could not update profile');
			}

			return {
				message: 'profile updated successfully',
				updatedProfile: true,
				dataRecords: result.rows[0],
				error: null,
			};
		} catch (error) {
			return {
				message: error.message,
				updatedProfile: false,
				dataRecords: [],
				error,
			};
		} finally {
			await client.end();
		}
	}
}
