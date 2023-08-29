import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: Work[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/product',
    method: 'get',
    params,
  })
}

export function add(data: Work) {
  return request({
    url: 'http://8.142.32.7:8888/product',
    method: 'post',
    data,
  })
}
export function put(data: Work) {
  return request({
    url: 'http://8.142.32.7:8888/product',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/product?id=${id}`,
    method: 'delete',
  })
}
