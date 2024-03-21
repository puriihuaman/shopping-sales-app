import { validateCustomer, validatePartialCustomer } from '../schemas/index.js';
import { ClientError, catchedAsync, response } from '../utils/index.js';

export class CustomerController {
	constructor({ customerModel }) {
		this.customerModel = customerModel;
	}

	getAllCustomers = catchedAsync(async (req, res) => {
		const { document } = req.query;
		const { message, obtainedCustomer, status, dataRecords } = document
			? await this.customerModel.getCustomerByDocument({ document })
			: await this.customerModel.getCustomers();

		return response(res, status, dataRecords, message);
	});
	getCustomerById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedCustomer, status, dataRecords } =
			await this.customerModel.getCustomerById({ id });

		return response(res, status, dataRecords, message);
	});
	createCustomer = catchedAsync(async (req, res) => {
		const { body } = req;
		const { error, success, data } = validateCustomer(body);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const input = { ...data };

		const { message, insertedCustomer, status, dataRecords } =
			await this.customerModel.createCustomer({ input });

		return response(res, status, dataRecords, message);
	});
	deleteCustomer = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, deletedCustomer, status, dataRecords } =
			await this.customerModel.deleteCustomer({ id });

		return response(res, status, dataRecords, message);
	});
	updateCustomer = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { error, success, data } = validatePartialCustomer(req.body);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const { message, updatedCustomer, status, dataRecords } =
			await this.customerModel.updateCustomer({ id, input: data });

		return response(res, status, dataRecords, message);
	});
}
