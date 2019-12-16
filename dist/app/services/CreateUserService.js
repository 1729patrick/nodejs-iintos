"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

var _RegistrationEmail = require('../jobs/RegistrationEmail'); var _RegistrationEmail2 = _interopRequireDefault(_RegistrationEmail);

class CreateUserService {
	async run({ user, school }) {
		const userExists = await _User2.default.findOne({ where: { email: user.email } });
		if (userExists) {
			throw new Error('User already exists');
		}

		let { schoolId } = school;
		if (!school.schoolId) {
			const schoolExists = await _School2.default.findOne({
				where: { name: school.name },
			});

			if (schoolExists) {
				throw new Error('School already exists');
			}

			({ id: schoolId } = await _School2.default.create(school));
		}

		const {
			name,
			email,
			cordinator,
			cordinatorVerification,
		} = await _User2.default.create({
			...user,
			schoolId,
		});

		_Queue2.default.add(_RegistrationEmail2.default.key, {
			name,
			email,
			cordinator,
			cordinatorVerification,
		});

		return { name, email, cordinator, cordinatorVerification };
	}
}

exports. default = new CreateUserService();
