import { tokenSign } from '../helpers/generate-token.js';
import { comparePassword } from '../helpers/handleBcrypt.js';

export class AuthController {
	#userModel;
	constructor({ userModel }) {
		this.#userModel = userModel;
	}

	loginControl = async (req, res) => {
		try {
			const { username, password } = req.body;

			const { message, foundUser, dataRecords, error } =
				await this.#userModel.login({ username });

			if (!foundUser && dataRecords.length === 0) {
				throw new Error(message);
			}

			const checkPassword = await comparePassword(
				password,
				dataRecords.password
			);

			const tokenSession = await tokenSign(dataRecords);

			if (!checkPassword) {
				return res.status(409).json({
					message: 'invalid username or password',
					data: [],
					errors: error,
				});
			}

			return res.status(200).json({
				message,
				data: dataRecords,
				errors: error,
				tokenSession,
			});
		} catch (error) {
			return res.status(404).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};

	registerUser = async (req, res) => {
		const { body } = req;

		const { success, error, data } = validateUser(body);

		if (error && !success)
			return res.status(400).json({ error: JSON.parse(error.message) });

		try {
			const input = {
				...data,
				password: await encryptPassword(data.password),
			};

			const user = await this.#userModel.createUser({ input });

			return res.status(201).json(user);

			// message,
			// 	data: dataRecords,
			// 	errors: error,
		} catch (error) {
			return res.status(500).json({
				message: 'Something goes wrong',
			});
		}
	};
}
