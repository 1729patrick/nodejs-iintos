"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _beequeue = require('bee-queue'); var _beequeue2 = _interopRequireDefault(_beequeue);
var _RegistrationEmail = require('../app/jobs/RegistrationEmail'); var _RegistrationEmail2 = _interopRequireDefault(_RegistrationEmail);
var _redis = require('../config/redis'); var _redis2 = _interopRequireDefault(_redis);

const jobs = [_RegistrationEmail2.default];

class Queue {
	constructor() {
		this.queues = {};

		this.init();
	}

	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				bee: new (0, _beequeue2.default)(key, {
					redis: _redis2.default,
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

exports. default = new Queue();
