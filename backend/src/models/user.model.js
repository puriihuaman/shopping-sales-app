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
			'INSERT INTO users (id_user, name_user, lastname, email, username, password, id_profile) VALUES ($1, $2, $3, $4, $5, $6, $7)';

		const idUser = randomUUID();

		const client = await pool.connect();
		const result = await client.query(insertQuery, [
			idUser,
			name_user,
			lastname,
			email,
			username,
			password,
			id_profile,
		]);

		if (result.rowCount !== 1 && result.command !== 'INSERT') return [];

		const selectionQuery = 'SELECT * FROM users WHERE id_user = $1';
		const response = await client.query(selectionQuery, [idUser]);
		await client.end();

		return response.rows[0];
	}
}
