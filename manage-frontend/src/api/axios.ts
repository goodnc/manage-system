import axios from "axios";
import { message } from "ant-design-vue";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 登录验证
    // config.headers.token = localStorage.getItem("$token_info");
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (
      response &&
      response.data &&
      (response.data.code === 401 || response.data.code === 403)
    ) {
      // token 过期
      message.error("无权限访问");
    }
    if (response && response.data && response.data.code !== 200) {
      message.error(response.data.msg);
      return Promise.reject(response.data);
    }
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status) {
      message.error(error.response.msg);
      return Promise.reject(error);
    }
  },
);

export default axios;
