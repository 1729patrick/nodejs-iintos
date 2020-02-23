"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class CancellationMail {
	get key() {
		return 'RegistrationEmail';
	}

	async handle({ data }) {
		const { newUser, receiver } = data;

		await _Mail2.default.sendMail({
			to: `${receiver.email}`,
			from: '"IINTOS" <foo@iintos.com>',
			subject: '[IINTOS] New Registered Approval',
			html: `
			<p><b><u>REGISTRATION DETAILS<u></b></p>
			<p><b>NAME:</b> ${newUser.name}</p>
			<p><b>EMAIL:</b> ${newUser.email}</p>
						
			 <a href="http://localhost:3000/confirm_cordinator">SHOW MORE DETAILS</a>`,
		});
	}
}

exports. default = new CancellationMail();
