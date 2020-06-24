import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema(
	{
		method: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		params: {
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

export default mongoose.model('Log', LogSchema);
