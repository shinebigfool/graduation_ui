import request from '@/utils/request'
// 获取全部的借书记录（借书日志管理）
export function getBorrowLog(params) {
  return request({
    url: '/borrow/page',
    method: 'get',
    params: params
  })
}
// 获取个人借书记录（个人借书记录）
export function getPersonnelLog(params) {
  return request({
    url: '/borrow/log',
    method: 'get',
    params: params
  })
}
// 查看单条借书记录详情
export function getLogDetail(params) {
  return request({
    url: '/borrow/detail',
    method: 'get',
    params: params
  })
}
// 还书
export function returnBook(params) {
  return request({
    url: '/borrow/return',
    method: 'put',
    data: params
  })
}
