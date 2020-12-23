import request from '@/utils/request'
export function uploadCover(param) {
  return request({
    url: '/book/cover',
    method: 'post',
    headers: { 'Content-type': 'multipart/json' },
    params: param
  })
}
