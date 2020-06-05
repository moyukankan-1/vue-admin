//在request.js中引入axios
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, getUsername} from './app'

const service = axios.create({
    baseURL: BASEURL,  // http://192.120.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
    timeout: 10000,   // 超时
})


// 添加一个请求拦截器
service.interceptors.request.use(function (config) {
  /**
   * 添加请求头
   */
  config.headers['Tokey'] = getToken()
  config.headers['UserName'] = getUsername()
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加一个响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  // 业务需求

  if(data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data);
  }else{
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})


export default service


