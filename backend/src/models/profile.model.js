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
		const insertQuery =
			'INSERT INTO profiles (id_profile, profile) VALUES ($1, $2);';
		const idProfile = randomUUID();

		const client = await pool.connect();

		const result = await client.query(insertQuery, [idProfile, profile]);

		if (result.rowCount !== 1 && result.command !== 'INSERT') return [];

		const selectionQuery = 'SELECT * FROM profiles WHERE id_profile = $1;';
		const response = await client.query(selectionQuery, [idProfile]);

		await client.end();
		return response.rows[0];
	}
}
