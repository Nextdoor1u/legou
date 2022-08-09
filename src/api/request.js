import axios from 'axios';
import { Toast } from 'vant';
var host;
if (process.env.NODE_ENV == 'development') {
	//开发环境
	host = 'http://shop.bufantec.com/bufan/';
} else {
	host = 'http://shop.bufantec.com/bufan/';
}

const instance = axios.create({
	//公共接口
	baseURL: host,
	//超时限制
	timeout: 5000,
});
//请求拦截器
var loading;
instance.interceptors.request.use(
	(config) => {
		//加载提示
		loading = Toast.loading({
			message: '加载中...',
			forbidClick: true,
		});
		//方便统一传递参数
		if (config.method.toLocaleLowerCase() == 'get') {
			config.params = config.data;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//响应拦截器
instance.interceptors.response.use(
	(res) => {
		loading.clear();
		return res;
	},
	(error) => {
		loading.clear();
		return Promise.reject(error);
	}
);

export default instance;
