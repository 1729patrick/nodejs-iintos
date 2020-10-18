import Notification from '../schemas/Notification';

class NotificationsController {
	async index(req, res) {
		const notifications = await Notification.find({ userId: req.userId });
		return res.json(notifications);
	}

	async update(req, res) {
		const notificationUpdated = await Notification.updateOne(
			{ _id: req.params.id },
			req.body
		);

		return res.json(notificationUpdated);
	}
}

export default new NotificationsController();
