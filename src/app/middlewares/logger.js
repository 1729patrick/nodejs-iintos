import Log from '../schemas/Log';

const logger = async (req, res, next) => {
	try {
		const { body, userId, originalUrl, method, params } = req;

		const bodyString = JSON.stringify(body);
		const paramsString = JSON.stringify(params);

		const log = {
			method: method,
			path: originalUrl,
			body: bodyString || '{}',
			params: paramsString || '{}',
			userId: userId || 'public',
		};

		await Log.create(log);
	} catch (e) {
		// console.log(e);
	}
	return next();
};

export default logger;
