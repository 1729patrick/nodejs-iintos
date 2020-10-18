import Bee from 'bee-queue';
import RegistrationEmail from '../app/jobs/RegistrationEmail';
import UserCreationEmail from '../app/jobs/UserCreationEmail';
import NewProjectEmail from '../app/jobs/NewProjectEmail';
import NewActivityEmail from '../app/jobs/NewActivityEmail';
import ActivationEmail from '../app/jobs/ActivationEmail';
import NewSchoolInProjectEmail from '../app/jobs/NewSchoolInProjectEmail';
import HelpEmail from '../app/jobs/HelpEmail';
import UserToUserEmail from '../app/jobs/UserToUserEmail';
import ActivityDoneEmail from '../app/jobs/ActivityDoneEmail';
import JoinRequestProject from '../app/jobs/JoinRequestProject';

import CreateEvent from '../app/jobs/CreateEvent';
import DeleteEvent from '../app/jobs/DeleteEvent';
import redisConfig from '../config/redis';

import '../database';

const jobs = [
	RegistrationEmail,
	CreateEvent,
	DeleteEvent,
	UserCreationEmail,
	NewProjectEmail,
	NewActivityEmail,
	ActivationEmail,
	NewSchoolInProjectEmail,
	HelpEmail,
	UserToUserEmail,
	ActivityDoneEmail,
	JoinRequestProject,
];

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
