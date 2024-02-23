import { validateUser } from '../schemas/user.schemas';

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

			const user = await this.#userModel.createUser({ input: data });

			return res.status(201).json(user);
		} catch (error) {
			return res.status(500).json({
				message: 'Something goes wrong',
			});
		}
	};
}
