import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';
import { randomUUID } from 'node:crypto';

export class CustomerModel {
	static async getCustomers() {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM customers';

			const result = await client.query(selectionQuery);

			return {
				message:
					result.rows.length > 0
						? 'Customers successfully obtainer'
						: 'No customers found',
				obtainedCustomer: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching customers'
				);
		} finally {
			await client.end();
		}
	}
	static async getCustomerByDocument({ document }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM customers WHERE id_document = $1';

			const result = await client.query(selectionQuery, [document]);

			return {
				message: 'Customer successfully obtainer',
				obtainedCustomer: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching the customer'
				);
		} finally {
			await client.end();
		}
	}
	static async getCustomerById({ id }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM customers WHERE id_customer = $1';
			const result = await client.query(selectionQuery, [id]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no customer with this ID'
				);
			}

			return {
				message: 'Customer successfully obtained',
				obtainedCustomer: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching the customer'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async createCustomer({ input }) {
		const client = await pool.connect();

		const { id_document, name, address, phone } = input;
		const idCustomer = randomUUID();

		try {
			const insertQuery =
				'INSERT INTO customers (id_customer, id_document, name, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *';

			const result = await client.query(insertQuery, [
				idCustomer,
				id_document,
				name,
				address,
				phone,
			]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Error registering',
					500,
					'Customer could not be registered'
				);
			}

			return {
				message: 'Customer registered successfully',
				insertedCustomer: true,
				status: 201,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_customers') {
				throw new ClientError(
					'The customer already exists',
					409,
					`The customer with this document '${id_document}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while registering the customer'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async deleteCustomer({ id }) {
		const client = await pool.connect();

		try {
			const deleteQuery =
				'DELETE FROM customers WHERE id_customer = $1 RETURNING *';
			const result = await client.query(deleteQuery, [id]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no customer with this ID'
				);
			}

			return {
				message: 'Customer delete successfully',
				deletedCustomer: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while trying to delete the customer'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async updateCustomer({ id, input }) {
		const client = await pool.connect();
		const { id_document, name, address, phone } = input;

		try {
			const updateQuery =
				'UPDATE customers SET id_document = COALESCE($1, id_document), name = COALESCE($2, name), address = COALESCE($3, address), phone = COALESCE($4, phone) WHERE id_customer = $5 RETURNING *;';

			const customerResult = await client.query(
				'SELECT id_document FROM customers WHERE id_customer = $1',
				[id]
			);

			const currentDocument = customerResult.rows[0].id_document;

			if (id_document && id_document !== currentDocument) {
				const docExistsQuery =
					'SELECT COUNT(*) FROM customers WHERE id_document = $1';
				const docExistsResult = await client.query(docExistsQuery, [
					id_document,
				]);

				if (docExistsResult.rows[0].count > 0) {
					throw new ClientError(
						'The customer already exists',
						400,
						`The customer with this document '${id_document}' already exists`
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
					'There is no customer with this ID'
				);
			}

			return {
				message: 'Customer updated successfully',
				updatedCustomer: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_customers') {
				throw new ClientError(
					'The customer already exists',
					409,
					`The customer with this document '${id_document}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while trying to update the customer'
				);
			}
		} finally {
			await client.end();
		}
	}
}
