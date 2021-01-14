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
// 按班级统计阅读量
export function qryReadingAmountByClass(params) {
  return request({
    url: '/class/readingAmountByClass',
    method: 'get',
    params: params
  })
}
// 按年级统计阅读量
export function qryReadingAmountByGrade(params) {
  return request({
    url: '/class/readingAmountByGrade',
    method: 'get',
    params: params
  })
}
// 按班级统计活跃人数
export function qryReadingStuByClass(params) {
  return request({
    url: '/class/readingStuByClass',
    method: 'get',
    params: params
  })
}
//  按年级统计活跃人数
export function qryReadingStuByGrade(params) {
  return request({
    url: '/class/readingStuByGrade',
    method: 'get',
    params: params
  })
}
// 删除班级
export function delClass(params) {
  return request({
    url: '/class/class',
    method: 'delete',
    data: params
  })
}
