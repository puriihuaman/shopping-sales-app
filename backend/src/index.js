import express, { json } from 'express';
import { PORT } from './config/config.js';
import { profileRouter } from './routes/profile.routes.js';

const app = express();

app.disable('x-powered-by');
app.use(json());

app.get('/api', (req, res) => {
	res.json({ message: 'Bienvenido' });
});

app.use('/api/profiles', profileRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Recurso no encontrado' });
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
