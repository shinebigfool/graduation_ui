import request from '@/utils/request'
// 分页查询图书，支持按书名，作者，上传者模糊查询
export function getList(params) {
  return request({
    url: '/book/page',
    method: 'get',
    params: params
  })
}
// 修改图书
export function modifyBook(param) {
  console.log(param)
  return request({
    url: '/book/modify',
    method: 'post',
    data: param
  })
}
// 审核图书
export function examineBook(param) {
  console.log(param)
  return request({
    url: '/book/examine',
    method: 'put',
    data: param
  })
}
// 下架
export function deleteBook(param) {
  return request({
    url: '/book/book',
    method: 'delete',
    data: param
  })
}
// 查询图书详情（包括是否被当前用户收藏）
export function showBookDetail(param) {
  return request({
    url: '/book/book',
    method: 'get',
    params: param
  })
}
// 收藏图书
export function addFavoriteBook(param) {
  return request({
    url: '/book/favorite',
    method: 'post',
    data: param
  })
}
// 取消收藏
export function removeFavoriteBook(param) {
  return request({
    url: '/book/favorite',
    method: 'delete',
    data: param
  })
}
// 借阅
export function lendBook(param) {
  return request({
    url: '/borrow/lend',
    method: 'post',
    data: param
  })
}
// 新增图书
export function addBook(param) {
  return request({
    url: '/book/book',
    method: 'post',
    data: param
  })
}
// 查看当前用户的收藏夹
export function listFavoriteBooks(param) {
  return request({
    url: '/book/favorite',
    method: 'get',
    param
  })
}
// 模糊查收藏夹
export function qryFavroiteBooks(params) {
  return request({
    url: '/book/searchFavorite',
    method: 'get',
    params: params
  })
}
// 收藏榜
export function favoriteCount(params) {
  return request({
    url: '/book/favoriteCount',
    method: 'get',
    params: params
  })
}
// 借阅榜
export function lendCount(params) {
  return request({
    url: '/borrow/lendCount',
    method: 'get',
    params: params
  })
}
// 我的图书
export function myBook(params) {
  return request({
    url: '/book/myBook',
    method: 'get',
    params: params
  })
}
// 赠送
export function gift(params) {
  return request({
    url: '/book/gift',
    method: 'put',
    data: params
  })
}
// 遗失
export function loss(params) {
  return request({
    url: '/book/loss',
    method: 'post',
    data: params
  })
}
// 损坏
export function broken(params) {
  return request({
    url: '/book/broken',
    method: 'post',
    data: params
  })
}
