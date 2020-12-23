import request from '@/utils/request'
export function fetchRecentData() {
  return request({
    url: '/borrow/count',
    method: 'get'
  })
}

export function fetchSuggestBook(params) {
  return request({
    url: '/book/suggest',
    method: 'get',
    params: params
  })
}
