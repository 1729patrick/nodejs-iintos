import jwt from 'jsonwebtoken';
import Log from '../models/Log';

const logger = async (req, res, next) => {
	try {
		const { headers, body, userId, originalUrl, method, params } = req;
		const { authorization } = headers;


		const bodyString = JSON.stringify(body);
		const paramsString = JSON.stringify(params);

		const log = {
			method: method,
			path: originalUrl,
			body: bodyString,
			params: paramsString,
			userId: userId,
		};

		const createdResult = await Log.create(log);

	
	} catch (e) {
		console.log(e);
	}
	return next();
};

export default logger;
