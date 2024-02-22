import express, { json } from 'express';

const app = express();

const PORT = process.env.PORT || 4200;

app.disable('x-powered-by');
app.use(json());

app.get('/', (req, res) => {
	res.json({ message: 'Bienvenido' });
});

app.use((req, res) => {
	res.status(404).json({ message: 'Recurso no encontrado' });
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
