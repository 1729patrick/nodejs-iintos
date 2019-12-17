"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class CancellationMail {
	get key() {
		return 'RegistrationEmail';
	}

	async handle({ data }) {
		console.log('EMAIL <ENVIADO></ENVIADO>');

		await _Mail2.default.sendMail({
			to: `Patrick <patrick.pb845@gmail.com>`,
			from: '"IINTOS" <foo@iintos.com>',
			subject: 'New Registered Cordinator',
			html: `
			<p><b><u>CORDENATOR DETAILS<u></b></p>
			<p><b>NAME:</b> xxx</p>
			<p><b>EMAIL:</b> pat</p>
						
			 <a href="http://localhost:3000/confirm_cordinator">SHOW MORE DETAILS</a>`,
		});
	}
}

exports. default = new CancellationMail();
