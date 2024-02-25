import { validateProfile } from '../schemas/profile.schemas.js';

export class ProfileController {
	#profileModel;

	constructor({ profileModel }) {
		this.#profileModel = profileModel;
	}

	getAll = async (req, res) => {
		try {
			const response = await this.#profileModel.getAll();
			if (!response) throw new Error('DB Error');

			return res.json(response);
		} catch (error) {
			return res.status(500).json({
				message: 'Something goes wrong',
			});
		}
	};

	createProfile = async (req, res) => {
		const { body } = req;

		const { success, error, data } = validateProfile(body);

		if (error && !success) {
			return res.status(400).json({ error: JSON.parse(error.message) });
		}

		const profile = await this.#profileModel.createProfile({
			input: data,
		});

		res.status(201).json(profile);
	};
}
