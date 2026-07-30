import axios from "axios";
import qs from "qs";

export default {
  get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: params || {},
      })
        .then((res: any = {}) => {
          if (res.code !== 200) {
            reject(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url: string, param: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
      })
        .then((res: any = {}) => {
          if (res.code !== 200) {
            reject(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // POST表单请求
  postForm(url: string, param: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: qs.stringify(param),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((res: any = {}) => {
          if (res.code !== 200) {
            reject(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // POST表单数据
  postFormData(url: any, param: any) {
    const formData = new FormData();
    for (const key in param) {
      formData.append(key, param[key]);
    }
    return axios({
      method: "post",
      url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  },
};
