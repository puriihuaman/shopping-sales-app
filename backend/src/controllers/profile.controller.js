import { validatePartialProfile, validateProfile } from '../schemas/index.js';

import { ClientError, catchedAsync, response } from '../utils/index.js';

export class ProfileController {
	#profileModel;

	constructor({ profileModel }) {
		this.#profileModel = profileModel;
	}

	// + después
	getAllProfiles = catchedAsync(async (req, res) => {
		const { message, obtainedProfile, status, dataRecords } =
			await this.#profileModel.getAll();

		response(res, status, dataRecords, message);
	});

	// + Antes
	/*
	getAllProfiles = async (req, res, next) => {
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
	*/

	getById = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, obtainedProfile, status, dataRecords } =
			await this.#profileModel.getById({
				id,
			});

		response(res, status, dataRecords, message);
	});

	/*
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
	*/

	createProfile = catchedAsync(async (req, res) => {
		const { body } = req;
		const { error, success, data } = validateProfile(body);

		if (error && !success) {
			throw new ClientError('invalid fields', 400, error.errors[0].message);
		}

		const { message, insertedProfile, status, dataRecords } =
			await this.#profileModel.createProfile({
				input: data,
			});

		response(res, status, dataRecords, message);
	});

	/*
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
	*/

	deleteProfile = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { message, deletedProfile, status, dataRecords } =
			await this.#profileModel.deleteProfile({ id });

		response(res, status, dataRecords, message);
	});

	/*
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
	*/

	updateProfile = catchedAsync(async (req, res) => {
		const { id } = req.params;

		const { error, success, data } = validatePartialProfile(req.body);

		if (error && !success) {
			throw new ClientError('invalid fields', 400, error.errors[0].message);
		}

		const { message, updatedProfile, status, dataRecords } =
			await this.#profileModel.updateProfile({
				id,
				input: data,
			});

		response(res, status, dataRecords, message);
	});

	/*
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
	*/
}
