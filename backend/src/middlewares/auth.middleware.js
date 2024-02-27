import { verifyToken } from '../helpers/generate-token.js';

const checkAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ').pop();
		// const token = req.headers.authorization.split(' ')[1];
		const tokenData = await verifyToken({ token });

		if (!tokenData || !tokenData.id_user) {
			// tu por aquí no pasas
			throw new Error("you don't pass here");
			// return res.status(409).json({ error: "you don't pass here" });
		} else {
			next();
		}
	} catch (error) {
		return res.status(409).json({ error: error.message });
	}
};

export { checkAuth };
