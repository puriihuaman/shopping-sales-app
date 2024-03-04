/**
 * error response type
 * @param {Request} res
 * @param {Number} statusCode
 * @param {String} message
 * @returns res.status(statusCode).json({error:true, message})
 */

const responseError = (res, statusCode, message, details) => {
	return res.status(statusCode).json({
		error: true,
		message,
		details,
	});
};

export { responseError };
