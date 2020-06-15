import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import Youch from 'youch';

import { join } from 'path';

import routes from './routes';
import './database';

class App {
	constructor() {
		this.server = express();

		this.middlewares();
		this.routes();
		this.exceptionHandler();
	}

	middlewares() {
		this.server.use(express.json());
		this.server.use(cors());

		this.server.use(
			'api/files',
			express.static(join(__dirname, '..', 'tmp', 'uploads'))
		);
	}

	routes() {
		this.server.use(routes);
	}

	exceptionHandler() {
		this.server.use(async (err, req, res, next) => {
			if (process.env.NODE_ENV === 'development') {
				const { error } = await new Youch(err, req).toJSON();

				return res.status(500).json({ error: err.message, details: error });
			}

			return res.status(500).json({ error: err.message });
		});
	}
}

export default new App().server;
