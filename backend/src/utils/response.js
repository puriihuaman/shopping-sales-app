/**
 * type of response
 * @param {Request} res
 * @param {Number} statusCode
 * @param {[]} data
 * @param {String} message
 */

const response = (res, statusCode, data, message = '') => {
	return res.status(statusCode).json({
		error: false,
		data,
		message,
	});
};

export { response };
