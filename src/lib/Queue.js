import Bee from 'bee-queue';
import RegistrationEmail from '../app/jobs/RegistrationEmail';
import redisConfig from '../config/redis';

const jobs = [RegistrationEmail];

class Queue {
	constructor() {
		this.queues = {};

		this.init();
	}

	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				bee: new Bee(key, {
					redis: redisConfig,
				}),
				handle,
			};
		});
	}

	add(queue, job) {
		return this.queues[queue].bee.createJob(job).save();
	}

	processQueue() {
		jobs.forEach(job => {
			const { bee, handle } = this.queues[job.key];

			bee.on('failed', this.handleFailute).process(handle);
		});
	}

	handleFailute(job, err) {
		console.log('***********************************');
		console.log(job, err);
		console.log('***********************************');
	}
}

export default new Queue();
