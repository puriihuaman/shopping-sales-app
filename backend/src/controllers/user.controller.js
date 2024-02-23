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
		try {
			const { body } = req;
			const { success, error, data } = validateUser(body);

			if (error && !success)
				return res.status(400).json({ error: JSON.parse(error.message) });

			const input = {
				...data,
				password: await encryptPassword(data.password),
			};

			const user = await this.#userModel.createUser({ input });

			return res.status(201).json(user);
		} catch (error) {
			return res.status(500).json({
				message: 'Something goes wrong',
			});
		}
	};
}
