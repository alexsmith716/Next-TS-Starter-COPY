import axios, { AxiosInstance } from 'axios';

export default function apiClient(): AxiosInstance {
	const instance = axios.create();

	//instance.interceptors.request.use(
	//	(request) => {
	//		return request;
	//	},
	//	(error) => {
	//		return Promise.reject(error);
	//	},
	//);

	// within the range of 2xx | outside the range of 2xx
	instance.interceptors.response.use(
		(response) => {
			//console.log('APAPAPAPPAAPPAPAPAPPPAPAPAP apiClient RESPONSE: ', response.data);
			return response.data;
		},
		(error) => {
			//console.log('APAPAPAPPAAPPAPAPAPPPAPAPAP apiClient ERROR: ', error);
			//return Promise.reject(error.response.data);
			return Promise.reject(error);
		},
	);

	return instance;
};
