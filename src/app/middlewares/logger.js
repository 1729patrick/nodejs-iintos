import jwt from 'jsonwebtoken';
import Log from '../models/Log';

const logger = async (req, res, next) => {
	try {
		const { headers, body, userId, originalUrl, method, params } = req;
		const { authorization } = headers;

		console.log('------------');
		//	console.log(req);

		console.log({ body, userId, originalUrl, method, params });

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

		console.log('Created Log');
		console.log(createdResult);
	} catch (e) {
		console.log(e);
	}
	return next();
};

export default logger;
