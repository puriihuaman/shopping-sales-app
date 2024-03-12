import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class ShoppingModel {
	static async getShopping() {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM shopping';

			const result = await client.query(selectionQuery);

			return {
				message:
					result.rows.length > 0
						? 'Shopping successfully obtainer'
						: 'No shopping found',
				obtainedShopping: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching shopping'
				);
			}
		} finally {
			await client.end();
		}
	}

	static async getShoppingById({ idShopping }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM shopping WHERE id_shopping = $1';

			const result = await client.query(selectionQuery, [idShopping]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no shopping with this ID'
				);
			}

			return {
				message: 'Shopping successfully obtained',
				obtainedShopping: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching the shopping'
				);
		} finally {
			await client.end();
		}
	}

	static async createShopping({ input }) {
		const client = await pool.connect();

		// id_shopping update_date id_provider id_product amount purchase_value id_user
		const {
			update_date,
			id_provider,
			id_product,
			amount,
			purchase_value,
			id_user,
		} = input;

		const idShopping = randomUUID();

		try {
			// + INSERTAR COMPRA
			// 		INSERT INTO shopping (code_provider, code_product, amount, purchase_value, code_user)
			// VALUES (_provider, _product, _amount, _purchase_value, _user) RETURNING code INTO _idinvoice;
			const insertQuery =
				'INSERT INTO shopping (id_shopping, update_date, id_provider, id_product, amount, purchase_value, id_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

			const shoppingResult = await client.query(insertQuery, [
				idShopping,
				update_date,
				id_provider,
				id_product,
				amount,
				purchase_value,
				id_user,
			]);

			if (shoppingResult.rowCount === 0) {
				throw new ClientError(
					'Error registering',
					500,
					'Product could not be registered'
				);
			}

			// + ACTUALIZAR PRODUCTOS
			// UPDATE products
			//   SET amount = amount + _amount, price = _purchase_value, code_user = _user
			//   WHERE code = _product;
			const updateQuery =
				'UPDATE products SET amount = amount + $1, price = $2, id_user = $3 WHERE id_product = $4';

			const productResult = await client.query(updateQuery, [
				amount,
				purchase_value,
				id_user,
				id_product,
			]);

			if (productResult.rowCount === 0) {
				throw new ClientError(
					'Error registering',
					500,
					'Product could not be registered'
				);
			}

			return {
				message: 'Shopping registered successfully',
				insertedShopping: true,
				status: 201,
				dataRecords: shoppingResult.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_shopping') {
				throw new ClientError(
					'The shopping already exists',
					409,
					`The shopping with this id '${idShopping}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while registering the shopping'
				);
			}
		} finally {
			await client.end();
		}
	}
}
