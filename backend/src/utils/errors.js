class ClientError extends Error {
	constructor(message, statusCode = 400, details = '') {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
	}
}

class AuthClientError extends Error {
	constructor(message, statusCode = 401, details = '') {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
	}
}

class ServerError extends Error {
	constructor(message, statusCode, details = '') {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
	}
}

export { AuthClientError, ClientError, ServerError };
