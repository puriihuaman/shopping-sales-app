import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 4200;

const DB_HOSTNAME = process.env.DB_HOSTNAME || 'localhost';
const DB_USERNAME = process.env.DB_USERNAME || 'puriihuaman';
const DB_NAME = process.env.DB_NAME || 'shopping_sales_app';
const DB_PASSWORD = process.env.DB_PASSWORD || '1998pvri';
const DB_PORT = process.env.DB_PORT || 5432;

export { PORT, DB_HOSTNAME, DB_USERNAME, DB_NAME, DB_PASSWORD, DB_PORT };
