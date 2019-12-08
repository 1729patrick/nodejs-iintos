import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes';
import './database';

class App {
	constructor() {
		this.routes();
	}

	routes() {
		this.express = express();

		this.express.use(bodyParser.json());
		this.express.use(cors());

		this.routes = this.express.use(routes);
	}
}

export default new App().express;
