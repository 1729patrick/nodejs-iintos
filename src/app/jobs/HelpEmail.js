import Mail from '../../lib/Mail';

/**
 * Email sent when a new project is created
 */
class HelpEmail {
	get key() {
		return 'HelpEmail';
	}

	async handle({ data }) {
		// Recives a new activity to send some of it's details
		const { email, body } = data;

		await Mail.sendMail({
			to: `iintosdev@gmail.com`,
			from: `${email}`,
			subject: '[IINTOS] Feedback',
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
			<b>New Feedback!</b></p>
			<p><span style="font-weight: 600"></span>Email: ${email}</p>
			<p><span style="font-weight: 600"></span>Body:  ${body}</p>
	
			</div>
			 `,
		});
	}
}

export default new HelpEmail();
