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
			const { message, obtainedProfile, dataRecords, error } =
				await this.#profileModel.getAll();

			if (!obtainedProfile && dataRecords.length === 0) {
				throw new Error(message);
			}

			return res.status(200).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};

	getById = async (req, res) => {
		const { id } = req.params;

		try {
			const { message, obtainedProfile, dataRecords, error } =
				await this.#profileModel.getById({ id });

			if (!obtainedProfile && dataRecords.length === 0) {
				throw new Error(message);
			}

			return res.status(200).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			return res.status(404).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};

	createProfile = async (req, res) => {
		const { body } = req;
		const validationResponse = validateProfile(body);

		if (validationResponse.error && !validationResponse.success) {
			return res.status(400).json({ error: validationResponse.error.message });
		}

		try {
			const { message, insertedProfile, dataRecords, error } =
				await this.#profileModel.createProfile({
					input: validationResponse.data,
				});

			if (!insertedProfile && dataRecords.length === 0) {
				throw new Error(message);
			}

			return res.status(201).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			return res.status(409).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};

	deleteProfile = async (req, res) => {
		const { id } = req.params;

		try {
			const { message, deletedProfile, dataRecords, error } =
				await this.#profileModel.deleteProfile({ id });

			if (!deletedProfile && dataRecords.length === 0) {
				throw new Error(message);
			}

			return res.status(200).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			return res.status(404).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};

	updateProfile = async (req, res) => {
		const { id } = req.params;

		const validationResponse = validatePartialProfile(req.body);

		if (validationResponse.error && !validationResponse.success) {
			return res.status(400).json({ error: validationResponse.error.message });
		}

		try {
			const { message, updatedProfile, dataRecords, error } =
				await this.#profileModel.updateProfile({
					id,
					input: validationResponse.data,
				});

			if (!updatedProfile && dataRecords.length === 0) {
				throw new Error(message);
			}

			return res.status(200).json({
				message,
				data: dataRecords,
				errors: error,
			});
		} catch (error) {
			return res.status(404).json({
				message: error.message,
				data: [],
				errors: error,
			});
		}
	};
}
