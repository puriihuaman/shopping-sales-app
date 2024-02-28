/**
 * asynchronous error catcher
 * @param {function} fn
 * @returns function
 */
const catchedAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res).catch((error) => next(error));
	};
};

export { catchedAsync };

/**
 * ¿Qué es una función de orden superior?
 * Es una función que recibe una función, y/o que retorna una función
 * que se va a comportar muy similar a la función que recibio
 * pero lo va a retornar algo mejorada
 */
