"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const auth = (req, res, next) => {
	const { headers } = req;
	const { authorization } = headers;

	if (!authorization) {
		return res.status(403).json({ error: 'Token not provided' });
	}
	const [_, token] = authorization.split(' ');

	const jwtDecoded = _jsonwebtoken2.default.decode(token);

	if (!jwtDecoded) {
		return res.status(403).json({ error: 'Invalid token' });
	}

	const { userId, role } = jwtDecoded;

	req.userId = userId;
	req.role = role;
	return next();
};

exports. default = auth;
