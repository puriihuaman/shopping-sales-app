import { comparePassword } from '../helpers/handleBcrypt.js';

export class AuthController {
	#userModel;
	constructor({ userModel }) {
		this.#userModel = userModel;
	}

	loginControl = async (req, res) => {
		try {
			const { username, password } = req.body;

			const { foundUser, data } = await this.#userModel.login({ username });

			if (!foundUser && !data) {
				return res.status(404).json({ message: 'user no found' });
			}

			const checkPassword = await comparePassword(password, data.password);

			if (!checkPassword) {
				return res.status(409).json({
					message: 'Invalid password',
				});
			}

			return res.status(200).json({
				data,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something goes wrong',
			});
		}
	};
}
