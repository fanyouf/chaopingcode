import request from '@/utils/request'

export function getList(params?: any) {
  return request({
    url: 'http://8.142.32.7:8888/question',
    method: 'get',
    params,
  })
}

export function doAdd(data?: Exercise) {
  return request({
    url: 'http://8.142.32.7:8888/question',
    method: 'post',
    data,
  })
}

export function doEdit(data: any) {
  return request({
    url: 'http://8.142.32.7:8888/question',
    method: 'put',
    data,
  })
}

export function doDelete(id: any) {
  return request({
    url: `http://8.142.32.7:8888/question?id=${id}`,
    method: 'delete',
  })
}
