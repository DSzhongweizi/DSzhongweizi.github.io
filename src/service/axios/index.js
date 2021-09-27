/*
 * @Author: DS
 * @Date: 2021-08-04 13:38:33
 * @LastEditTime: 2021-08-18 09:19:10
 * @LastEditors: DS
 * @Description: desc
 * @FilePath: \dmu-web\src\service\axios\index.js
 */
import axios from "axios";

import handleRequest from "./handleRequest";
import handleResponse from "./handleResponse";
import handleError from "./handleError";
axios.defaults.timeout = 3000;

let instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      "Content-Type": "application/json;charset=utf-8",
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    put: {
      "Content-Type": "application/json;charset=utf-8",
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
  },
});
// instance.defaults.headers["Access-Control-Allow-Origin"] = "*"
export { instance, handleRequest, handleResponse, handleError };
