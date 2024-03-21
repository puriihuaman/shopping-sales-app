import { validatePartialProduct, validateProduct } from '../schemas/index.js';
import { ClientError, catchedAsync, response } from '../utils/index.js';

export class ProductController {
	constructor({ productModel }) {
		this.productModel = productModel;
	}

	getAllProducts = catchedAsync(async (req, res) => {
		const { name } = req.query;

		const { message, obtainedProduct, status, dataRecords } = name
			? await this.productModel.getProductByName({ nameProduct: name })
			: await this.productModel.getProducts();

		return response(res, status, dataRecords, message);
	});
	getProductById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedProduct, status, dataRecords } =
			await this.productModel.getProductById({ idProduct: id });

		return response(res, status, dataRecords, message);
	});
	createProduct = catchedAsync(async (req, res) => {
		const { body } = req;
		const { error, success, data } = validateProduct(body);
		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const input = { ...data };

		const { message, insertedProduct, status, dataRecords } =
			await this.productModel.createProduct({ input });

		return response(res, status, dataRecords, message);
	});
	deleteProduct = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, deletedProduct, status, dataRecords } =
			await this.productModel.deleteProduct({ idProduct: id });

		return response(res, status, dataRecords, message);
	});
	updateProduct = catchedAsync(async (req, res) => {
		const { id } = req.params;
		const { error, succes, data } = validatePartialProduct(req.body);

		if (error && !succes) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const { message, updatedProduct, status, dataRecords } =
			await this.productModel.updateProduct({ idProduct: id, input: data });

		return response(res, status, dataRecords, message);
	});
}
