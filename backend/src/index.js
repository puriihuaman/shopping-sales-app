import express, { json } from 'express';
import { PORT } from './config/config.js';
import { corsMiddlewares } from './middlewares/cors.middleware.js';
import { authRouter } from './routes/auth.routes.js';
import { customerRouter } from './routes/customer.routes.js';
import { profileRouter } from './routes/profile.routes.js';
import { userRouter } from './routes/user.routes.js';
import { responseError } from './utils/index.js';

const app = express();

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddlewares());

app.use('/api/login', authRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);

// + Manejando los errores
app.use((error, req, res, next) => {
	const { message, statusCode, details } = error;

	responseError(res, statusCode, message, details);
});

app.use((req, res) => {
	res.status(404).json({ message: 'Recurso no encontrado' });
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
