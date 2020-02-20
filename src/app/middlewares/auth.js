import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
	const { headers } = req;
	const { authorization } = headers;

	if (!authorization) {
		return res.status(403).json({ error: 'Token not provided' });
	}
	const [_, token] = authorization.split(' ');

	const jwtDecoded = jwt.decode(token);

	if (!jwtDecoded) {
		return res.status(403).json({ error: 'Invalid token' });
	}

	const { userId, role } = jwtDecoded;

	req.userId = userId;
	req.role = role;
	return next();
};

export default auth;
