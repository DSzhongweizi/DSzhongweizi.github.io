import axios from 'axios'
import apis from './index'
axios.defaults.baseURL = "/api"
axios.defaults.timeout = 5000

// axios实例化
const instance = axios.create()
// 添加请求拦截器
instance.interceptors.request.use(config => {
  return config
}, (err) => {
  return Promise.reject(err)
})
// 添加响应拦截器
instance.interceptors.response.use(res => {
  return Promise.resolve(res);
}, (err) => {
  return Promise.reject(err)
})

const http = {}
// 统一api请求参数
const format = (api, request) => {
  return async args => {
    switch (api.method) {
      case 'get': case 'delete':
        /^[\/|\?]/.test(args) ? api.url += args : api.params = args;
        break;
      case 'post': case 'put': case 'patch':
        api.data = args
        break;
      default:
    }
    return await request(api)
  }
}
Object.keys(apis).forEach(api => http[api] = format(apis[api], instance))

export default http