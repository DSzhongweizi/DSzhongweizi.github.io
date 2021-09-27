/*
 * @Author: DS
 * @Date: 2021-08-04 10:56:59
 * @LastEditTime: 2021-08-18 17:40:48
 * @LastEditors: DS
 * @Description: desc
 * @FilePath: \dmu-web\src\service\http.js
 */
import { instance, handleRequest, handleResponse, handleError } from "./axios";
import service from "./api";
import { ElLoading, ElMessage } from "element-plus";
const Http = {}; // 包裹请求方法的容器
// 请求格式迭代统一
const loop = (service) =>
  Object.keys(service).forEach((api) =>
    service[api].method
      ? (Http[api] = handleRequest(service[api], instance))
      : loop(service[api])
  );
loop(service);

let loading = null;
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    loading = ElLoading.service({ text: "努力请求中..." });
    return config;
  },
  (err) => Promise.reject(err)
);
// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    loading.close();
    return Promise.resolve(handleResponse(res));
  },
  (err) => {
    loading.close();
    if (!err) return Promise.reject(err);
    if (err.response)
      err = err.response.data.msg ? err.response.data : handleError(err);
    else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      // if (instance.isCancel(err)) {
      //     throw instance.Cancel(err.msg || `请求'${Http.config.url}'被取消`)
      // } else if (err.stack && err.stack.includes('timeout')) {
      //     err.msg = '请求超时!'
      // } else {
      //     err.msg = '连接服务器失败!'
      // }
      err.msg = "连接服务器失败!";
    }
    ElMessage.error(err.msg);
    return Promise.reject(err);
  }
);

export default Http;
