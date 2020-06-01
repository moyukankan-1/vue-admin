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
 * 子级分类添加
 */
export function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
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
/**
 * 获取全部分类(包含子级)
 */
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  })
}
/**
 * 删除分类
 */
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  })
}
/**
 * 修改分类
 */
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  })
}

/**
 * 新增信息
 */
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  })
}
/**
 * 获取列表
 */
export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  })
}
/**
 * 删除信息
 */
export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  })
}
/**
 * 编辑
 */
export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  })
}
/**
 * 获取省市区关联
 */
export function GetCityPicker(data) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data
  })
}
/**
 * 角色列表
 */
export function GetRole(data = {}) {
  return service.request({
    method: "post",
    url: "/role/",
    data
  })
}
/**
 * 添加
 */
export function UserAdd(data = {}){
  return service.request({
      method: "post",
      url: "/user/add/",
      data
  })
}