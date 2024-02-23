import bcrypt from 'bcryptjs';

/**
 * Función para cifrar contraseña
 * @param {string} passwordPlain
 * @returns {Promise<string>} Retorna una promesa que resuelve a una contraseña hasheada
 */
const encryptPassword = async (passwordPlain) => {
	const hash = await bcrypt.hash(passwordPlain, 10);

	return hash;
};

/**
 * Función para comparar contraseñas
 * @param {string} passwordPlain - contraseña en texto plano
 * @param {string} hashPassword - contraseña hasheada
 * @returns {Promise<boolean>} Retorna una promesa que resuelve a verdadero si las contraseñas coinciden, y falso si no.
 */
const comparePassword = (passwordPlain, hashPassword) => {
	return bcrypt.compare(passwordPlain, hashPassword);
};

export { encryptPassword };
