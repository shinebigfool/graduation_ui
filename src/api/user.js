import request from '@/utils/request'
// TODO 登录，后续返回TOKEN
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    params: data
  })
}
// TODO 获取用户角色信息，返回Object列表
export function getInfo(token) {
  return request({
    url: '/user/role',
    method: 'get',
    params: { token }
  })
}
// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
// 分页查询用户支持按账号精准查
export function getWholeUser() {
  return request({
    url: '/user/page',
    method: 'get'
  })
}
// 注册，支持带角色注册，已加权限验证
export function regist(params) {
  return request({
    url: '/user/regist',
    method: 'post',
    data: params
  })
}
// 改变用户状态，已加权限验证
export function blackList(params) {
  return request({
    url: '/user/blackList',
    method: 'put',
    params
  })
}
// 删除用户
export function deleteUser(params) {
  return request({
    url: '/user/user',
    method: 'delete',
    data: params
  })
}
// 修改用户信息
export function modUser(params) {
  return request({
    url: '/user/userInfo',
    method: 'put',
    data: params
  })
}
// 查询角色信息
export function listRoles(params) {
  return request({
    url: '/user/roleList',
    method: 'get',
    params: params
  })
}
// 分页查询用户信息(带班级，用户名，账号筛选条件)
export function qryUsersPage(params) {
  return request({
    url: '/user/student',
    method: 'get',
    params: params
  })
}
