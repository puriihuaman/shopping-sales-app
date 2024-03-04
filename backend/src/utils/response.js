/**
 * type of response
 * @param {Request} res
 * @param {Number} statusCode
 * @param {[]} data
 * @param {String} message
 */

const response = (res, statusCode, data, message = '', token = '') => {
	return res.status(statusCode).json({
		error: false,
		data,
		message,
		token,
	});
};

export { response };
