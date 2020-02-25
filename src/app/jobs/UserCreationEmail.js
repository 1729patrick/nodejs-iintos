import Mail from '../../lib/Mail';

/**
 * Email sent when the admin creates an user
 */
class UserCreationEmail {
	get key() {
		return 'UserCreationEmail';
	}
	/**
	 *	
	 * @param {*} param0
	 */
	async handle({ data }) {
		const { newUser, receiver } = data;

		await Mail.sendMail({
			to: `${receiver.email}`,
			from: '"IINTOS" <foo@iintos.com>',
			subject: '[IINTOS] New Registration',
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
			<b>New Registration</b></p>
			<p><span style="font-weight: 600">Name:</span> ${newUser.name}</p>
			<p><span style="font-weight: 600">E-mail:</span> <a href="${newUser.email}" style="text-decoration: none; color: #000">${newUser.email}</a></p>
			<p><span style="font-weight: 600">Password:</span> <a href="${newUser.password}" style="text-decoration: none; color: #000">${newUser.password}</a></p>
			<p><span style="font-weight: 600">Role:</span> <a href="${newUser.role}" style="text-decoration: none; color: #000">${newUser.role}</a></p>


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
			 text-decoration: none;" href="https://iintos.netlify.com/users/approve">Go to IIntos</a>
			 </div>
			 `,
		});
	}
}

export default new UserCreationEmail();
