import service from '@/utils/request'

/**
 * 获取验证码
 */

 export function GetSms(data) {
   return service.request({
     method: "post",
     url: "/getSms/",
     data
   })
 }

 /**
  * 注册
  */
 export function Register(data) {
   return service.request({
     method: 'post',
     url: '/register/',
     data
   })
 }

 /**
  * 登录
  */
 export function Login(data) {
  return service.request({
    method: 'post',
    url: '/login/',
    data
  })
}