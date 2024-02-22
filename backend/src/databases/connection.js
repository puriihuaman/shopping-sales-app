import pg from 'pg';
import {
	DB_HOSTNAME,
	DB_NAME,
	DB_PASSWORD,
	DB_PORT,
	DB_USERNAME,
} from '../config/config.js';

const { Pool } = pg;

const connectionSettings = {
	host: DB_HOSTNAME,
	user: DB_USERNAME,
	database: DB_NAME,
	password: DB_PASSWORD,
	port: DB_PORT,
};

const pool = new Pool(connectionSettings);

export { pool };
