import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class ProviderModel {
	static async getProviders() {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM providers';

			const result = await client.query(selectionQuery);

			return {
				message:
					result.rows.length > 0
						? 'Providers successfully obtainer'
						: 'No providers found',
				obtainedProvider: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error ocurred while fetching providers'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async getProviderByDocument({ document }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM providers WHERE id_document = $1';
			const result = await client.query(selectionQuery, [document]);

			return {
				message: 'Provider successfully obtainer',
				obtainedProvider: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Interanl server error',
					500,
					'An error ocurred while fetching the provider'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async getProviderById({ id }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM providers WHERE id_provider = $1';
			const result = await client.query(selectionQuery, [id]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no provider with this ID'
				);
			}

			return {
				message: 'Provider successfully obtained',
				obtainedProvider: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching the provider'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async createProvider({ input }) {
		const client = await pool.connect();

		const { id_document, name, address, phone } = input;
		const idProvider = randomUUID();

		try {
			const insertQuery =
				'INSERT INTO providers (id_provider, id_document, name, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *';

			const result = await client.query(insertQuery, [
				idProvider,
				id_document,
				name,
				address,
				phone,
			]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Error registering',
					500,
					'Provider could not be registered'
				);
			}

			return {
				message: 'Provider registered successfully',
				insertedProvider: true,
				status: 201,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_providers') {
				throw new ClientError(
					'The provider already exists',
					409,
					`The provider with this document '${id_document}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while registering the provider'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async deleteProvider({ id }) {
		const client = await pool.connect();

		try {
			const deleteQuery =
				'DELETE FROM providers WHERE id_provider = $1 RETURNING *';
			const result = await client.query(deleteQuery, [id]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no provider with this ID'
				);
			}

			return {
				message: 'Provider delete successfully',
				deletedProvider: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while trying to delete the provider'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async updateProvider({ id, input }) {
		const client = await pool.connect();
		const { id_document, name, address, phone } = input;

		try {
			const updateQuery =
				'UPDATE providers SET id_document = COALESCE($1, id_document), name = COALESCE($2, name), address = COALESCE($3, address), phone = COALESCE($4, phone) WHERE id_provider = $5 RETURNING *;';

			const providerResult = await client.query(
				'SELECT id_document FROM providers WHERE id_provider = $1',
				[id]
			);

			const currentDocument = providerResult.rows[0].id_document;

			if (id_document && id_document !== currentDocument) {
				const docExistsQuery =
					'SELECT COUNT(*) FROM providers WHERE id_document = $1';
				const docExistsResult = await client.query(docExistsQuery, [
					id_document,
				]);

				if (docExistsResult.rows[0].count > 0) {
					throw new ClientError(
						'The provider already exists',
						400,
						`The provider with this document '${id_document}' already exists`
					);
				}
			}

			const result = await client.query(updateQuery, [
				id_document,
				name,
				address,
				phone,
				id,
			]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no provider with this ID'
				);
			}

			return {
				message: 'Provider updated successfully',
				updatedProvider: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_providers') {
				throw new ClientError(
					'The provider already exists',
					409,
					`The provider with this document '${id_document}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while trying to update the provider'
				);
			}
		} finally {
			await client.end();
		}
	}
}
