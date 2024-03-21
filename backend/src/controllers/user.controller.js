import { encryptPassword } from '../helpers/handleBcrypt.js';
import { validatePartialUser, validateUser } from '../schemas/index.js';
import { ClientError, catchedAsync, response } from '../utils/index.js';

export class UserController {
	#userModel;

	constructor({ userModel }) {
		this.#userModel = userModel;
	}

	getUsers = catchedAsync(async (req, res) => {
		const { username } = req.query;

		const { message, obtainedUser, status, dataRecords } = username
			? await this.#userModel.getUserByUsername({ username })
			: await this.#userModel.getUsers();

		return response(res, status, dataRecords, message);
	});

	getUserById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedUser, status, dataRecords } =
			await this.#userModel.getUserById({ id });

		return response(res, status, dataRecords, message);
	});

	createUser = catchedAsync(async (req, res) => {
		const { body } = req;
		const { error, success, data } = validateUser(body);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const input = {
			...data,
			password: await encryptPassword(data.password),
		};

		const { message, insertedUser, status, dataRecords } =
			await this.#userModel.createUser({ input });

		return response(res, status, dataRecords, message);
	});

	deleteUser = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, deletedUser, status, dataRecords } =
			await this.#userModel.deleteUser({ id });

		return response(res, status, dataRecords, message);
	});

	updateUser = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { error, success, data } = validatePartialUser(req.body);

		if (error && !success) {
			throw new ClientError('Invalid fields', 400, error.errors[0].message);
		}

		const { message, updatedUser, status, dataRecords } =
			await this.#userModel.updateUser({
				id,
				input: data,
			});

		return response(res, status, dataRecords, message);
	});
}
