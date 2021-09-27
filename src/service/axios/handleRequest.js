/*
 * @Author: DS
 * @Date: 2021-08-04 13:37:51
 * @LastEditTime: 2021-08-18 13:51:53
 * @LastEditors: DS
 * @Description: desc
 * @FilePath: \dmu-web\src\service\axios\handleRequest.js
 */

// 统一请求格式
export default (api, instance) => {
  /**
   * @description:        async 可以避免进入回调地狱，采用解构赋值
   * @param {params}      请求参数 get：url，put，post，patch（data），delete：url
   * @param {url}         路径参数  get put delete
   * @param {isFormData}  标识是否是form-data请求
   * @param {config}      配置参数,比如header
   */
  return async ({ params, url = "", isFormData = false, config = {} } = {}) => {
    let newParams = {};
    if (params && isFormData) {
      newParams = new FormData();
      for (let i in params) newParams.append(i, params[i]);
    } else newParams = params;
    // 不同请求的判断
    let response = {}; // 请求的返回值
    if (
      api.method === "put" ||
      api.method === "post" ||
      api.method === "patch"
    ) {
      try {
        response = await instance[api.method](api.url + url, newParams, config);
      } catch (err) {
        response = err;
      }
    } else if (api.method === "delete" || api.method === "get") {
      config.params = newParams;
      try {
        response = await instance[api.method](api.url + url, config);
      } catch (err) {
        response = err;
      }
    }
    return response; // 返回响应值
  };
};
