import { verifyToken } from '../helpers/generate-token.js';
import { responseError } from '../utils/index.js';

const checkAuth = async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization.split(' ')[1];

	if (!authorization || !token) {
		return responseError(
			res,
			409,
			'you do not have authorization',
			"you don't have permissions. you need an authorization token"
		);
		// No tienes permisos. Necesitas un token de autorización
	}

	const tokenData = await verifyToken({ token });

	if (!tokenData || !tokenData.id_user) {
		return responseError(
			res,
			409,
			'invalid authorization',
			'you need a valid authorization token'
		);
		// autorización no válida
		// necesitas un token de autorización válido
	} else {
		next();
	}
};

export { checkAuth };
