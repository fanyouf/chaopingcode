import request from '@/utils/request'

export function getList(params: any) {
  return request.get<{ list: Knowledge[]; total: number }>(
    '/knowledge/getList',
    params
  )
}

export function doEdit(data: any) {
  return request({
    url: '/knowledge/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/knowledge/doDelete',
    method: 'post',
    data,
  })
}
