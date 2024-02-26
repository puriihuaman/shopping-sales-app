import { encryptPassword } from '../helpers/handleBcrypt.js';
import { validateUser } from '../schemas/user.schemas.js';

export class UserController {
	#userModel;

	constructor({ userModel }) {
		this.#userModel = userModel;
	}

	getAll = async (req, res) => {
		try {
			const response = await this.#userModel.getAll();

			if (!response) throw new Error('DB Error');

			return res.json(response);
		} catch (error) {
			return res.status(500).json({
				message: 'Something goes wrong',
			});
		}
	};

	createUser = async (req, res) => {
		const { body } = req;
		const validationResponse = validateUser(body);
		if (validationResponse.error && !validationResponse.success)
			return res
				.status(400)
				.json({ error: JSON.parse(validationResponse.error.message) });

		try {
			const input = {
				...validationResponse.data,
				password: await encryptPassword(validationResponse.data.password),
			};

			const { message, insertedUser, dataRecords, error } =
				await this.#userModel.createUser({ input });

			if (!insertedUser && dataRecords.length === 0) {
				throw message;
			}

			return res.status(201).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			// return res.status(500).json({
			// 	message: 'Something goes wrong',
			// });

			return res.status(409).json({
				message: error.message,
				data: dataRecords,
				errors: error,
			});
		}
	};
}
