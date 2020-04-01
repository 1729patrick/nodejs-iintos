import Mail from '../../lib/Mail';

/**
 * Email sent when a new project is created
 */
class UserToUserEmail {
	get key() {
		return 'UserToUserEmail';
	}

	async handle({ data }) {
		// Recives a new activity to send some of it's details
		const { sendEmail, recEmail, body } = data;

		await Mail.sendMail({
			to: `${recEmail}`,
			from: `${sendEmail}`,
			subject: '[IINTOS] Emailing',
			html: `
			<div style="
			width: 500px;
			background: #ddd;
			padding: 30px;
			border-radius: 6px;
			font-size: 15px;
			margin: 0 auto;
			">

			<p style="
			font-size: 27px;
			font-weight: 600;
			margin: 0 0 15px;
			">
			
			<p><span style="font-weight: 600"></span>Sender Email: ${sendEmail}</p>
			<p><span style="font-weight: 600"></span>Body:  ${body}</p>

			Don't responde to this email, if you want to communicate with this
			person just send and email to them.
			</div>
			 `,
		});
	}
}

export default new UserToUserEmail();
