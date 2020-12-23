import request from '@/utils/request'
// 注册班级
export function registClass(params) {
  return request({
    url: '/class/class',
    method: 'post',
    data: params
  })
}
// 显示班级
export function qryClass(params) {
  return request({
    url: '/class/class',
    method: 'get',
    params: params
  })
}
// 修改班级
export function modClass(params) {
  return request({
    url: '/class/class',
    method: 'put',
    data: params
  })
}
// 录入用户
export function addUser(params) {
  return request({
    url: '/class/user',
    method: 'post',
    data: params
  })
}
// 移出用户
export function removeUser(params) {
  return request({
    url: '/class/user',
    method: 'delete',
    data: params
  })
}
