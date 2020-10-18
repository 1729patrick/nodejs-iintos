import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		read: {
			type: Boolean,
			required: true,
			default: false,
		},
		url: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Notification', NotificationSchema);
