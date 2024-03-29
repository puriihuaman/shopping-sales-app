import jwt from 'jsonwebtoken';

const tokenSign = async (user) => {
	return await jwt.sign(
		{
			id_user: user.id_user,
			username: user.username,
			id_profile: user.id_profile,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1h',
		}
	);
};

const verifyToken = async ({ token }) => {
	try {
		return await jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return null;
	}
};

const decodeSign = ({ token }) => {
	return jwt.decode(token, null);
};

export { tokenSign, verifyToken, decodeSign };
