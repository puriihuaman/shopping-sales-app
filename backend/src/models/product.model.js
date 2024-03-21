import { randomUUID } from 'node:crypto';
import { pool } from '../databases/connection.js';
import { ClientError, ServerError } from '../utils/index.js';

export class ProductModel {
	static async getProducts() {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM products';

			const result = await client.query(selectionQuery);

			return {
				message:
					result.rows.length > 0
						? 'Product successfully obtainer'
						: 'No product found',
				obtainedProduct: true,
				status: 200,
				dataRecords: result.rows,
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching product'
				);
			}
		} finally {
			await client.end();
		}
	}

	static async getProductByName({ nameProduct }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM products WHERE LOWER(name) = $1';

			const result = await client.query(selectionQuery, [
				nameProduct.toLowerCase(),
			]);

			return {
				message: 'Product successfully obtainer',
				obtainedProduct: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while fetching the product'
				);
		} finally {
			await client.end();
		}
	}

	static async getProductById({ idProduct }) {
		const client = await pool.connect();

		try {
			const selectionQuery = 'SELECT * FROM products WHERE id_product = $1';
			const result = await client.query(selectionQuery, [idProduct]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no product with this ID'
				);
			}

			return {
				message: 'Product successfully obtained',
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
					'An error occurred while fetching the product'
				);
			}
		} finally {
			await client.end();
		}
	}

	static async createProduct({ input }) {
		const client = await pool.connect();

		const { name, amount, price, id_user } = input;
		const idProduct = randomUUID();

		try {
			const insertQuery =
				'INSERT INTO products (id_product, name, amount, price, id_user) VALUES ($1, $2, $3, $4, $5) RETURNING *';

			const result = await client.query(insertQuery, [
				idProduct,
				name,
				amount,
				price,
				id_user,
			]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Error registering',
					500,
					'Product could not be registered'
				);
			}

			return {
				message: 'Product registered successfully',
				insertedProduct: true,
				status: 201,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_products') {
				throw new ClientError(
					'The product already exists',
					409,
					`The product with this id '${idProduct}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while registering the product'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async deleteProduct({ idProduct }) {
		const client = await pool.connect();

		try {
			const deleteQuery =
				'DELETE FROM products WHERE id_product = $1 RETURNING *';
			const result = await client.query(deleteQuery, [idProduct]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no product with this ID'
				);
			}

			return {
				message: 'Product delete successfully',
				deletedProduct: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while trying to delete the product'
				);
			}
		} finally {
			await client.end();
		}
	}
	static async updateProduct({ idProduct, input }) {
		const client = await pool.connect();
		const { name, amount, price, id_user } = input;

		try {
			const updateQuery =
				'UPDATE products SET name = COALESCE($1, name), amount = COALESCE($2, amount), price = COALESCE($3, price), id_user = COALESCE($4, id_user) WHERE id_product = $5 RETURNING *;';

			const productResult = await client.query(
				'SELECT id_product FROM products WHERE id_product = $1',
				[idProduct]
			);

			const currentProduct = productResult.rows[0].id_product;

			if (idProduct && idProduct !== currentProduct) {
				const docExistsQuery =
					'SELECT COUNT(*) FROM products WHERE id_product = $1';
				const docExistsResult = await client.query(docExistsQuery, [idProduct]);

				if (docExistsResult.rows[0].count > 0) {
					throw new ClientError(
						'The product already exists',
						400,
						`The product with this id '${idProduct}' already exists`
					);
				}
			}

			const result = await client.query(updateQuery, [
				name,
				amount,
				price,
				id_user,
				idProduct,
			]);

			if (result.rowCount === 0) {
				throw new ClientError(
					'Invalid ID',
					404,
					'There is no product with this ID'
				);
			}

			return {
				message: 'Product updated successfully',
				updatedProduct: true,
				status: 200,
				dataRecords: result.rows[0],
			};
		} catch (error) {
			if (error instanceof ClientError) throw error;
			else if (error.code === '23505' && error.constraint === 'uk_products') {
				throw new ClientError(
					'The product already exists',
					409,
					`The product with this id '${id}' already exists`
				);
			} else {
				throw new ServerError(
					'Internal server error',
					500,
					'An error occurred while trying to update the product'
				);
			}
		} finally {
			await client.end();
		}
	}
}
