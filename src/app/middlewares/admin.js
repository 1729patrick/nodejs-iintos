import jwt from 'jsonwebtoken';

const admin = (req, res, next) => {
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
	console.log(role);
	if (role !== 'Admin') {
		return res
			.status(403)
			.json({ error: 'You must be admin to access this route' });
	}

	req.userId = userId;
	req.role = role;
	return next();
};

export default admin;
