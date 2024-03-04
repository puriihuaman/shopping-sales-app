import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class UserModel {
	static async getUsers() {
		const selectionQuery = 'SELECT * FROM users';

		const client = await pool.connect();

		try {
			const result = await client.query(selectionQuery);

			if (result.rowCount === 0) {
				// error al obtener usuarios
				// no se pudo obtener los usuarios
				throw new ClientError(
					'Error getting users',
					400,
					'Could not get users'
				);
			}

			return {
				message: 'Users successfully obtained',
				obtainedUser: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else {
				throw new ServerError('Internal server error', 500);
			}
		} finally {
			await client.end();
		}
	}

	static async getUserByUsername({ username }) {
		const selectionQuery = 'SELECT * FROM users WHERE username = $1';

		const client = await pool.connect();

		try {
			const result = await client.query(selectionQuery, [username]);

			return {
				message: 'User successfully obtained',
				obtainedUser: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else {
				throw new ServerError('Internal server error', 500);
			}
		} finally {
			await client.end();
		}
	}

	static async getUserById({ id }) {
		const selectionQuery = 'SELECT * FROM users WHERE id_user = $1';

		const client = await pool.connect();
		try {
			const result = await client.query(selectionQuery, [id]);

			if (result.rowCount === 0) {
				// no se encontró ningún usuario con ese ID
				throw new ClientError('invalid ID', 404, 'No user found with that ID');
			}

			return {
				message: 'User successfully obtained',
				obtainedUser: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else {
				throw new ServerError('Internal server error', 500);
			}
		} finally {
			await client.end();
		}
	}

	static async createUser({ input }) {
		const { name_user, lastname, email, username, password, id_profile } =
			input;

		const insertQuery =
			'INSERT INTO users (id_user, name_user, lastname, email, username, password, id_profile) VALUES ($1, $2, $3, $4, LOWER($5), $6, $7) RETURNING *';

		const idUser = randomUUID();
		const client = await pool.connect();

		try {
			const result = await client.query(insertQuery, [
				idUser,
				name_user,
				lastname,
				email,
				username.toLowerCase(),
				password,
				id_profile,
			]);

			if (result.rowCount === 0) {
				// no se pudo registrar el usuario
				throw new ClientError(
					'Error registering',
					500,
					'User could not be registered'
				);
			}

			return {
				message: 'User registered successfully',
				insertedUser: true,
				status: 201,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error.code === '23505' && error.constraint === 'uk_users') {
				throw new ClientError(
					`User with username '${username}' already exists`,
					409,
					'The username already exists. Please try another username'
				);
			} else {
				throw new ServerError('Error when registering user', 500, '');
			}
		} finally {
			await client.end();
		}
	}

	static async deleteUser({ id }) {
		const deleteQuery = 'DELETE FROM users WHERE id_user = $1 RETURNING *;';

		const client = await pool.connect();

		try {
			const result = await client.query(deleteQuery, [id]);

			if (result.rowCount === 0) {
				// id invalido
				// no se encontró ningún usuario con ese ID
				throw new ClientError('Invalid ID', 404, 'No user found with that ID');
			}

			return {
				message: 'User deleted successfully',
				deletedUser: true,
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

	static async updateUser({ id, input }) {
		const updateQuery =
			'UPDATE users SET name_user = COALESCE($1, name_user), lastname = COALESCE($2, lastname), email = COALESCE($3, email), id_profile = COALESCE($4, id_profile) WHERE id_user = $5 RETURNING *;';

		const { name_user, lastname, email, username, password, id_profile } =
			input;

		const client = await pool.connect();

		try {
			const userResult = await client.query(
				'SELECT username FROM users WHERE id_user = $1',
				[id]
			);
			const currentUsername = userResult.rows[0].username;
			if (username && username !== currentUsername) {
				const usernameExistsQuery =
					'SELECT COUNT(*) FROM users WHERE username = $1';
				const usernameExistsResult = await client.query(usernameExistsQuery, [
					username,
				]);
				if (usernameExistsResult.rows[0].count > 0) {
					throw new ClientError(
						`User with username '${username}' already exists`,
						400,
						'Username already exists'
					);
				}
			}

			const result = await client.query(updateQuery, [
				name_user,
				lastname,
				email,
				id_profile,

				id,
			]);

			if (result.rowCount === 0) {
				// id invalido
				// no se encontró ningún usuario con ese ID
				throw new ClientError('Invalid ID', 404, 'No user found with that ID');
			}

			// else if (result.rows[0].username === username) {
			// 	console.log(result.rows[0].username, username);
			// 	// El usuario '' ya está registrado.
			// 	// El nuevo username es igual al username existente, no es necesario actualizar
			// 	throw new ClientError(
			// 		`User with username '${username}' already exists`,
			// 		400,
			// 		'New username is the same as the existing one'
			// 	);
			// }

			return {
				message: 'User updated successfully',
				updatedUser: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) {
				throw error;
			} else if (error.code === '23505' && error.constraint === 'uk_users') {
				// El usuario '' ya está registrado.
				// ya existe el usuario. Por favor, intente con otro nombre de usuario
				throw new ClientError(
					`User with username '${username}' already exists`,
					409,
					'the usuario already exists. Please try another username'
				);
			} else {
				throw new ServerError('error updating user', 500, '');
			}
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
					'Invalid username',
					404,
					'No user was found with that username'
				);
			}

			return {
				message: 'Welcome', // bienvenido
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
					'Invalid ID',
					404,
					'No user was found with that profile'
				);
			}

			return {
				message: 'User successfully obtained',
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
