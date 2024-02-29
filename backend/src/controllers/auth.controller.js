import { tokenSign } from '../helpers/generate-token.js';
import { comparePassword } from '../helpers/handleBcrypt.js';
import { AuthClientError, catchedAsync, response } from '../utils/index.js';

export class AuthController {
	#userModel;
	constructor({ userModel }) {
		this.#userModel = userModel;
	}

	loginControl = catchedAsync(async (req, res) => {
		const { username, password } = req.body;

		const { message, foundUser, status, dataRecords } =
			await this.#userModel.login({ username });

		const checkPassword = await comparePassword(password, dataRecords.password);

		if (!checkPassword) {
			throw new AuthClientError(
				'credentials error',
				409,
				'invalid username or password'
			);
		}

		const tokenSession = await tokenSign(dataRecords);

		response(res, status, dataRecords, message, tokenSession);
	});
}
