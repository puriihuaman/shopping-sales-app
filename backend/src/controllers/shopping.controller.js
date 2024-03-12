import { validateShopping } from '../schemas/index.js';
import { ClientError, catchedAsync, response } from '../utils/index.js';

export class ShoppingController {
	constructor({ shoppingModel }) {
		this.shoppingModel = shoppingModel;
	}

	getAllShopping = catchedAsync(async (req, res) => {
		const { message, obtainedShopping, status, dataRecords } =
			await this.shoppingModel.getShopping();

		return response(res, status, dataRecords, message);
	});
	getShoppingById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedShopping, status, dataRecords } =
			await this.shoppingModel.getShoppingById({ idShopping: id });

		return response(res, status, dataRecords, message);
	});
	createShopping = catchedAsync(async (req, res) => {
		const { body } = req;
		const updateDate = new Date().toISOString();

		const updatedBody = {
			update_date: updateDate,
			...body,
		};

		const { error, success, data } = validateShopping(updatedBody);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const input = { ...data };

		const { message, insertedShopping, status, dataRecords } =
			await this.shoppingModel.createShopping({ input });

		return response(res, status, dataRecords, message);
	});
}
