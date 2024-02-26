import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';

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
		const selectionQuery = 'SELECT * FROM users WHERE username = $1';

		const client = await pool.connect();
		const result = await client.query(selectionQuery, [username.toLowerCase()]);

		if (result.rowCount !== 1 && result.command !== 'SELECT') {
			return {
				foundUser: false,
				data: null,
			};
		}

		await client.end();

		return {
			foundUser: true,
			data: result.rows[0],
		};
	}
}
