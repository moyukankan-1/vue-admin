import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, getUsername} from './app'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
    baseURL: BASEURL,  // http://192.120.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
    timeout: 10000,   // 超时
})


// 添加一个请求拦截器
service.interceptors.request.use(function (config) {
  // Do something before request is sent

  /**
   * 添加请求头
   */
  config.headers['Tokey'] = getToken()
  config.headers['Username'] = getUsername()
  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
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
    // return Promise.resolve(data);
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})


export default service
