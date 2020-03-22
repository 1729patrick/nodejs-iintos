import Mail from '../../lib/Mail';

/**
 * Email sent when the user change it's activate
 */
class ActivationEmail {
	get key() {
		return 'ActivationEmail';
	}
	/**
	 *
	 * @param {*} param0
	 */
	async handle({ data }) {
		const { newUser, receiver } = data;
		var body = '';
		console.log("EMAIL");
		if (newUser.active) {
			body = `
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
			<h1><span style="font-weight: 600"> You got Activated! </h1>


			 <a style="   
			 height: 50px;
			 border-radius: 4px;
			 border: none;
			 background: #0c1e3f;
			 color: #fff;
			 font-weight: 500;
			 font-size: 16px;
			 padding: 0 16px;
			 text-decoration: none;
			 width: 470px;
			 display: flex;
			 margin: 0 auto;
			 line-height: 50px;
			 text-align: center;
			 ustify-content: center;
			 text-decoration: none;" href="https://iintos.netlify.com/">Go to IIntos and Explore!</a>
			 </div>
			 `;
		} else {
			body = `
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
			<h1><span style="font-weight: 600"> Your request to the platform got reject! </h1>
			<p><span style="font-weight: 600">Because: </span> ${newUser.reasonInactive}</p>

			 </div>
			 `;
		}

		await Mail.sendMail({
			to: `${receiver.email}`,
			from: '"IINTOS" <foo@iintos.com>',
			subject: '[IINTOS] Activation email',
			html: body,
		});
	}
}

export default new ActivationEmail();
