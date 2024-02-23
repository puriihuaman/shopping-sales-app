import express, { json } from 'express';
import { PORT } from './config/config.js';
import { profileRouter } from './routes/profile.routes.js';
import { userRouter } from './routes/user.routes.js';

const app = express();

app.disable('x-powered-by');
app.use(json());

app.use('/api/profiles', profileRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Recurso no encontrado' });
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
