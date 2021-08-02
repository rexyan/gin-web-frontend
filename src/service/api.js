import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.baseURL = "/api/v1/";

var instance = axios.create({timeout: 1000 * 12});
instance.interceptors.request.use((config) => {
  let loginResult = JSON.parse(localStorage.getItem("loginResult"));
  if (loginResult) { 
	const token = loginResult.token
	config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
	return Promise.reject(error);
});

instance.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response.data);
		} else {
			return Promise.resolve(response.data);
		}
	},
	(error) => {
		// 接口请求非 200 统一处理
		if (error.response.status != 200){
			Message.error({message: error.response.data.msg})
			return
		}
		console.log('error', error);
	}
);
export default instance;