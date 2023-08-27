import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: WorkCate[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/productGroup',
    method: 'get',
    params,
  })
}

export function add(data: WorkCate) {
  return request({
    url: 'http://8.142.32.7:8888/productGroup',
    method: 'post',
    data,
  })
}
export function put(data: WorkCate) {
  return request({
    url: 'http://8.142.32.7:8888/productGroup',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/productGroup?id=${id}`,
    method: 'delete',
  })
}
