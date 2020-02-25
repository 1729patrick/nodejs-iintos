import axios from 'axios';

const api = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3334/api/calendar'
			: process.env.CALENDAR_URL,
});

export default api;
