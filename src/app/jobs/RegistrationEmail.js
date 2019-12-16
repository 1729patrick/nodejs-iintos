import Mail from '../../lib/Mail';

class CancellationMail {
	get key() {
		return 'RegistrationEmail';
	}

	async handle({ data }) {
		const { newUser, receiver } = data;

		await Mail.sendMail({
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

export default new CancellationMail();
