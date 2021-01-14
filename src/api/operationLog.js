import request from '@/utils/request'
export function qryLog(params) {
  return request({
    url: '/log/log',
    method: 'get',
    params: params
  })
}
