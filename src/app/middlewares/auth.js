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

	const { userId, role, schoolId } = jwtDecoded;

	if (userId === 91 && req.method !== 'GET') {
		return res.status(403).json({ error: 'Your user has limited access!' });
	}

	req.userId = userId;
	req.schoolId = schoolId;
	req.role = role;
	return next();
};

export default auth;
