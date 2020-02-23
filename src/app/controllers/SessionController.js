import jwt from 'jsonwebtoken';

import User from '../models/User';
import School from '../models/School';
import Role from '../models/Role';
import File from '../models/File';

import authConfig from '../../config/auth';

class SessionController {
	async create(req, res) {
		const { email, password } = req.body;

		const user = await User.findOne({
			where: { email },
			include: [
				{
					model: School,
					as: 'school',
					attributes: ['id', 'name', 'phone', 'country', 'city', 'postalCode'],
				},
				{
					model: Role,
					as: 'role',
					attributes: ['name'],
				},
				{
					model: File,
					as: 'certificate',
				},
			],
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ error: "Password don't match" });
		}

		const { id, name, role, active, school, certificate } = user;

		if (
			!user.school &&
			(role.name === 'Coordinator' || role.name === 'Professor')
		) {
			return res.status(401).json({ error: "You'r school is invalid" });
		}

		const token = jwt.sign(
			{
				userId: id,
				role: role.name,
				active,
				schoolId: school ? school.id : null,
			},
			authConfig.secret,
			{
				expiresIn: authConfig.expiresIn,
			}
		);

		return res.json({
			user: {
				name,
				email,
				active,
				certificate: certificate ? certificate.url : null,
				role: role.name,
			},
			school,
			token,
		});
	}
}

export default new SessionController();
