import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class UserModel {
	static async getAll() {
		const selectionQuery = 'SELECT * FROM users';

		const client = await pool.connect();
		const result = await client.query(selectionQuery);

		await client.end();
		return result.rows;
	}

	static async createUser({ input }) {
		const { name_user, lastname, email, username, password, id_profile } =
			input;

		const insertQuery =
			'INSERT INTO users (id_user, name_user, lastname, email, username, password, id_profile) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

		const idUser = randomUUID();
		const client = await pool.connect();

		try {
			const result = await client.query(insertQuery, [
				idUser,
				name_user,
				lastname,
				email,
				username,
				password,
				id_profile,
			]);

			if (result.rowCount === 0 && result.rows.length === 0) {
				// no se pudo registrar el usuario
				throw new Error('user could not be registered');
			}

			return {
				message: 'user registered successfully', // usuario registrado exitosamente
				insertedUser: true,
				dataRecords: result.rows[0],
				error: null,
			};
		} catch (error) {
			if (error.code === '23505' && error.constraint === 'uk_users') {
				return {
					message: 'user already exists. Please choose another username',
					insertedUser: false,
					dataRecords: [],
					error,
				};
				// El usuario ya existe. Por favor, elija otro nombre de usuario
			}

			return {
				message: 'error inserting user', // Error al insertar el usuario
				insertedUser: false,
				dataRecords: [],
				error,
			};
		} finally {
			await client.end();
		}
	}

	static async login({ username }) {
		const selectionQuery = 'SELECT * FROM users WHERE username = $1;';

		const client = await pool.connect();

		try {
			const result = await client.query(selectionQuery, [
				username.toLowerCase(),
			]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'invalid username',
					404,
					'no user was found with that username'
				);
			}

			return {
				message: 'welcome', // bienvenido
				foundUser: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else {
				throw new ServerError('Internal server error', 500, '');
			}
		} finally {
			await client.end();
		}
	}

	static async verifyProfile({ idUser }) {
		// const selectionQuery = 'SELECT * FROM users WHERE id_user = $1;';
		// const selectionQuery =
		// 	'SELECT u.id_user, u.username, u.email, p.profile AS profile FROM users AS u, profiles AS p WHERE u.id_user = $1 AND u.id_profile = p.id_profile;';
		const selectionQuery =
			'SELECT u.id_user, u.username, u.email, p.profile AS profile FROM users AS u INNER JOIN profiles AS p ON u.id_user = $1 AND u.id_profile = p.id_profile;';

		const client = await pool.connect();

		try {
			const result = await client.query(selectionQuery, [idUser]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'invalid ID',
					404,
					'no user was found with that profile'
				);
			}

			return {
				message: 'user successfully obtained',
				verifyUser: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else {
				throw new ServerError('Internal server error', 500, '');
			}
		} finally {
			await client.end();
		}
	}
}
