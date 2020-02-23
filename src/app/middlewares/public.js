import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const { headers } = req;
	const { authorization } = headers;

	if (!authorization) {
		return next();
	}
	const [_, token] = authorization.split(' ');

	const jwtDecoded = jwt.decode(token);

	if (!jwtDecoded) {
		return next();
	}

	const { userId, role, schoolId } = jwtDecoded;

	req.userId = userId;
	req.schoolId = schoolId;
	req.role = role;
	return next();
};
