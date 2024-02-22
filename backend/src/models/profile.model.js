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

	static async createProfile({ input }) {
		const { profile } = input;
		const insertQuery = 'INSERT INTO profiles (code, profile) VALUES ($1, $2);';
		const code = randomUUID();

		const client = await pool.connect();

		const result = await client.query(insertQuery, [code, profile]);

		if (result.rowCount !== 1 && result.command !== 'INSERT') return [];

		const selectionQuery = 'SELECT * FROM profiles WHERE code = $1;';
		const response = await client.query(selectionQuery, [code]);

		await client.end();
		return response.rows[0];
	}
}
