import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class SaleModel {
	static async getSales() {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM sales';

			const result = await client.query(selectionQuery);

			return {
				message:
					result.rows.length > 0
						? 'Successfully obtained sales'
						: 'No sales found',
				obtainedSales: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching sales'
				);
		} finally {
			await client.end();
		}
	}
	static async getSalesById({ idSale }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM sales WHERE id_sale = $1';

			const result = await client.query(selectionQuery, [idSale]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no sale with this ID'
				);
			}

			return {
				message: 'Successfully obtained sales',
				obtainedSales: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching sales'
				);
		} finally {
			await client.end();
		}
	}
	static async calculateSalesTotal({ idProduct, amount = 0 }) {
		const client = await pool.connect();

		try {
			// + Stock check
			const productStockResult = await client.query(
				'SELECT * FROM products WHERE id_product = $1',
				[idProduct]
			);

			if (productStockResult.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no product with this ID'
				);
			}

			const product = productStockResult.rows[0];

			if (product.amount < amount) {
				let errorMessage = '';
				errorMessage =
					product.amount === 0
						? 'The product is out of stock'
						: `Insufficient stocks. Available: ${product.amount}`;

				throw new ClientError('Insufficient stocks', 400, errorMessage);
			}

			// + Calculate the total
			const total = product.price * amount;

			return {
				message: 'Total calculated successfully',
				totalObtained: true,
				status: 200,
				dataRecords: [
					{
						total,
						amount,
						product: {
							id_product: product.id_product,
							name: 'Teclado RGB',
							price: '950',
							id_user: 'adb229db-bd28-40c0-a937-f66ed16e507a',
						},
					},
				],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code) {
				throw new ClientError(
					'Invalid ID',
					404,
					'The ID provided is not a valid UUID'
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while total calculated'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async createSale({ input }) {
		const client = await pool.connect();

		// id_sale(se crea aqui) - update_date - id_customer - id_product - amount - sale_value(total) - id_user
		const {
			update_date,
			id_customer,
			id_product,
			amount,
			sale_value,
			id_user,
		} = input;
		const idSale = randomUUID();

		try {
			const insertQuery =
				'INSERT INTO sales (id_sale, update_date, id_customer, id_product, amount, sale_value, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

			const saleResult = await client.query(insertQuery, [
				idSale,
				update_date,
				id_customer,
				id_product,
				amount,
				sale_value,
				id_user,
			]);

			if (saleResult.rowCount === 0) {
				throw new ClientError(
					'Error when registering sale',
					500,
					'The sale could not be carried out successfully'
				);
			}

			// + se actualiza el stock del producto
			// UPDATE products
			// SET amount = amount - _amount, code_user = _user
			// WHERE code = _product;
			const updateQuery =
				'UPDATE products SET amount = amount - $1, id_user = $2 WHERE id_product = $3 RETURNING *';
			const productResult = await client.query(updateQuery, [
				amount,
				id_user,
				id_product,
			]);

			if (productResult.rowCount === 0) {
				throw new ClientError(
					'Error updating stock',
					500,
					'Product stock could not be updated'
				);
			}

			return {
				message: 'Sale successfully registered',
				insertedSale: true,
				status: 201,
				dataRecords: saleResult.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			console.log(error);
		} finally {
			await client.end();
		}
	}
}
