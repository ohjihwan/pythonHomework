import axios from 'axios';

const api = axios.create({
	baseURL: 'http://host.docker.internal:5000',
	timeout: 3000,
	headers: { 'Content-Type': 'application/json' },
});

export default api;
