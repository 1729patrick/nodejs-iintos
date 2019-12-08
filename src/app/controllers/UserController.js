import User from '../models/User';
import School from '../models/School';

class UserController {
	async store(req, res) {
		const { user, school } = req.body;

		let { schoolId } = school;
		if (!schoolId) {
			({ id: schoolId } = await School.create(school));
		}

		const userExists = await User.findOne({ where: { email: user.email } });
		if (userExists) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const {
			name,
			email,
			cordinator,
			cordinatorVerification,
		} = await User.create({
			...user,
			schoolId,
		});

		return res.json({
			name,
			email,
			cordinator,
			schoolId,
			cordinatorVerification,
		});
	}
}

export default new UserController();
