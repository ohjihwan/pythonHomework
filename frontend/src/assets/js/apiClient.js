import axios from 'axios';

const apiClient = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// 토큰 자동 삽입 인터셉터
apiClient.interceptors.request.use((config) => {
	const token = sessionStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

apiClient.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response && err.response.status === 401) {
			alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
			sessionStorage.removeItem('token');
			window.location.href = '/login';
		}
		return Promise.reject(err);
	}
);

export default apiClient;