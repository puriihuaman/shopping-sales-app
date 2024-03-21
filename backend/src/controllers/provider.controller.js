import { validatePartialProvider, validateProvider } from '../schemas/index.js';
import { ClientError, catchedAsync, response } from '../utils/index.js';

export class ProviderController {
	constructor({ providerModel }) {
		this.providerModel = providerModel;
	}

	getProviders = catchedAsync(async (req, res) => {
		const { document } = req.query;

		const { message, obtainedProvider, status, dataRecords } = document
			? await this.providerModel.getProviderByDocument({ document })
			: await this.providerModel.getProviders();

		return response(res, status, dataRecords, message);
	});
	getProviderById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedProvider, status, dataRecords } =
			await this.providerModel.getProviderById({ id });

		return response(res, status, dataRecords, message);
	});
	createProvider = catchedAsync(async (req, res) => {
		const { body } = req;
		const { error, success, data } = validateProvider(body);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const input = { ...data };

		const { message, insertedProvider, status, dataRecords } =
			await this.providerModel.createProvider({ input });
		return response(res, status, dataRecords, message);
	});
	deleteProvider = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, deletedProvider, status, dataRecords } =
			await this.providerModel.deleteProvider({ id });

		return response(res, status, dataRecords, message);
	});
	updateProvider = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { error, success, data } = validatePartialProvider(req.body);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const { message, updatedProvider, status, dataRecords } =
			await this.providerModel.updateProvider({ id, input: data });

		return response(res, status, dataRecords, message);
	});
}
