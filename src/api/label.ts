import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: Label[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/label',
    method: 'get',
    params: { sortField: 'order', sortOrder: 'asc', ...params },
  })
}

export function add(data: Label) {
  return request({
    url: 'http://8.142.32.7:8888/label',
    method: 'post',
    data,
  })
}
export function put(data: Label) {
  return request({
    url: 'http://8.142.32.7:8888/label',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/label?id=${id}`,
    method: 'delete',
  })
}

export function getValueListV(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: Label[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/label/value',
    method: 'get',
    params,
  })
}

export function addValue(data: LabelValue) {
  return request({
    url: 'http://8.142.32.7:8888/label/value',
    method: 'post',
    data,
  })
}
export function putValue(data: LabelValue) {
  return request({
    url: 'http://8.142.32.7:8888/label/value',
    method: 'put',
    data,
  })
}

export function delValue(id: number) {
  return request({
    url: `http://8.142.32.7:8888/label/value?id=${id}`,
    method: 'delete',
  })
}
