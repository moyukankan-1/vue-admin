import service from '@/utils/request'
/**
 * 一级分类添加
 */
export function AddFristCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  })
}
/**
 * 获取分类
 */
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  })
}