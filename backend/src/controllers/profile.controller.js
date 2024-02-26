import {
	validatePartialProfile,
	validateProfile,
} from '../schemas/profile.schemas.js';

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

	getById = async (req, res) => {
		const { id } = req.params;

		const { message, obtainedUser, dataRecords, error } =
			await this.#profileModel.getById({ id });

		if (!obtainedUser && dataRecords.length === 0)
			return res.status(404).json({
				message,
				data: dataRecords,
				errors: error,
			});

		return res.status(200).json({
			message,
			data: dataRecords,
			errors: error,
		});
	};

	createProfile = async (req, res) => {
		const { body } = req;
		const validationResponse = validateProfile(body);

		if (validationResponse.error && !validationResponse.success) {
			return res.status(400).json({ error: validationResponse.error.message });
		}

		try {
			const { message, insertedUser, dataRecords, error } =
				await this.#profileModel.createProfile({
					input: validationResponse.data,
				});

			// if (!result.insertedUser && result.dataRecords.length === 0)
			// 	return res.status().json({ message: result.error });
			if (!insertedUser && dataRecords.length === 0) {
				throw message;
				// return res.status().json({ message: result.error });
			}

			return res.status(201).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			return res.status(409).json({
				message: error.message,
				data: dataRecords,
				errors: error,
			});
		}
	};

	deleteProfile = async (req, res) => {
		const { id } = req.params;

		const { message, deletedUser, dataRecords, error } =
			await this.#profileModel.deleteProfile({ id });

		if (!deletedUser && dataRecords.length === 0)
			return res.status(404).json({
				message,
				data: dataRecords,
				errors: error,
			});

		return res.status(200).json({
			message,
			data: dataRecords,
			errors: error,
		});
	};

	updateProfile = async (req, res) => {
		const { id } = req.params;

		const validationResponse = validatePartialProfile(req.body);

		if (validationResponse.error && !validationResponse.success) {
			return res.status(400).json({ error: validationResponse.error.message });
		}

		try {
			const { message, updatedUser, dataRecords, error } =
				await this.#profileModel.updateProfile({
					id,
					input: validationResponse.data,
				});

			if (!updatedUser && dataRecords.length === 0) {
				throw new Error(message);
			}

			return res.status(200).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			console.error(error.message);
			return res.status(404).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};
}
