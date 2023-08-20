import request from '@/utils/request'

export function getList(params?: any) {
  return request({
    url: 'http://8.142.32.7:8888/subject',
    method: 'get',
    params,
  })
}

export function doAdd(data?: any) {
  return request({
    url: 'http://8.142.32.7:8888/subject',
    method: 'post',
    data,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/area/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/area/doDelete',
    method: 'post',
    data,
  })
}
