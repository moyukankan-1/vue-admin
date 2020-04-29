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