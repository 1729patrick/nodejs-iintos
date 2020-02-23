import Api from '../../lib/Axios';

class CancellationMail {
	get key() {
		return 'CreateEvent';
	}

	async handle({ data }) {
		console.log(data);

		// await Api.post('/events');
	}
}

export default new CancellationMail();
