import axios from "axios";
import { message } from "antd";
const baseURL = "http://localhost:6066";
// create an axios instance
const request = axios.create({
  baseURL: baseURL, // url = base url + request url
  timeout: 20000, // request timeout
});
const loadingKey = "loading";
// request interceptor
request.interceptors.request.use(
  (config: any) => {
    message.loading({
      content: "拼命加载中...", // 加载动画的文字
      key: loadingKey,
    });
    return config;
  },
  (error: any) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response: any) => {
    message.destroy(loadingKey);
    const { data } = response;
    const { msg } = data;
    message.success({
      content: msg,
      duration: 3,
      key: "success",
    });
    return data;
  },
  (error: Error) => {
    message.destroy(loadingKey);
    // message.error({
    //   content: error,
    //   duration: 3,
    //   key: "error",
    // });
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export { request };
