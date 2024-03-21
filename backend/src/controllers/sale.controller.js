import { validateSale } from '../schemas/index.js';
import { ClientError, catchedAsync, response } from '../utils/index.js';

export class SaleController {
	constructor({ saleModel }) {
		this.saleModel = saleModel;
	}

	getAllSales = catchedAsync(async (req, res) => {
		const { message, obtainedSales, status, dataRecords } =
			await this.saleModel.getSales();

		return response(res, status, dataRecords, message);
	});
	getSalesById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedSales, status, dataRecords } =
			await this.saleModel.getSalesById({ idSale: id });

		return response(res, status, dataRecords, message);
	});
	calculateSalesTotal = catchedAsync(async (req, res) => {
		const { idProduct, amount } = req.body;

		if (
			!idProduct ||
			typeof idProduct !== 'string' ||
			idProduct.trim().length === 0
		) {
			throw new ClientError(
				'Complete fields',
				400,
				'You must provide a valid Product ID'
			);
		}

		if (!amount || amount <= 0 || typeof amount !== 'number') {
			throw new ClientError(
				'Complete fields',
				400,
				'You must provide a valid amount, greater than zero'
			);
		}

		const { message, totalObtained, status, dataRecords } =
			await this.saleModel.calculateSalesTotal({ idProduct, amount });

		return response(res, status, dataRecords, message);
	});
	createSale = catchedAsync(async (req, res) => {
		const { body } = req;

		const updateDate = new Date().toISOString();

		const updatedBody = {
			update_date: updateDate,
			...body,
		};

		const { error, success, data } = validateSale(updatedBody);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const { message, insertedSale, status, dataRecords } =
			await this.saleModel.createSale({ input: data });

		return response(res, status, dataRecords, message);
	});
}
