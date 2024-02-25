import cors from 'cors';

const ACCEPTED_ORIGINS = [
	'http://localhost:8080',
	'http://localhost:3000',
	'http://localhost:4200',
	'https://shopping-sales-app.com',
	'https://midudev.com',
];

export const corsMiddlewares = (acceptedOrigins = ACCEPTED_ORIGINS) =>
	cors({
		origin: (origin, cb) => {
			if (acceptedOrigins.includes(origin)) {
				return cb(null, true);
			}

			if (!origin) {
				return cb(null, true);
			}

			return cb(new Error('Not allowed by CORS'));
		},
	});
