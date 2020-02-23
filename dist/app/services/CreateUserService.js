"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _School = require('../models/School'); var _School2 = _interopRequireDefault(_School);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);

var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

var _RegistrationEmail = require('../jobs/RegistrationEmail'); var _RegistrationEmail2 = _interopRequireDefault(_RegistrationEmail);

class CreateUserService {
	async run({ user, school, role }) {
		const userExists = await _User2.default.findOne({ where: { email: user.email } });

		if (userExists) {
			throw new Error('User already exists');
		}

		let { schoolId, name } = school;

		if (!schoolId && name) {
			const schoolExists = await _School2.default.findOne({
				where: { name },
			});

			if (schoolExists) {
				throw new Error('School already exists');
			}

			({ id: schoolId } = await _School2.default.create(school));
		}

		const findedRole = await _Role2.default.findOne({
			where: { name: user.coordinator ? 'Coordinator' : 'Professor' },
			attributes: ['id'],
		});

		const roleId = findedRole.id;
		const randomPass = (Math.random(1729) * 1000000).toFixed(0);

		const createdUser = await _User2.default.create({
			...user,
			password: user.password || randomPass,
			roleId,
			schoolId,
		});

		const { passwordHash, password, ...restUser } = createdUser.toJSON();

		if (role) {
			return restUser;
		}

		let receiverEmail = process.env.ADMIN_EMAIL;
		if (!user.coordinator) {
			const coordinator = await _User2.default.findOne({
				attributes: ['email'],
				where: { schoolId, roleId: 1, active: true },
			});

			if (coordinator) {
				receiverEmail = coordinator.email;
			}
		}

		_Queue2.default.add(_RegistrationEmail2.default.key, {
			newUser: { name: createdUser.name, email: createdUser.email },
			receiver: { email: receiverEmail },
		});

		return restUser;
	}
}

exports. default = new CreateUserService();
