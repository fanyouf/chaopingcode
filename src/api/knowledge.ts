import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: Knowledge[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/knowledge',
    method: 'get',
    params,
  })
}

export function add(data: Knowledge) {
  return request({
    url: 'http://8.142.32.7:8888/knowledge',
    method: 'post',
    data,
  })
}
export function put(data: Knowledge) {
  return request({
    url: 'http://8.142.32.7:8888/knowledge',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/knowledge?id=${id}`,
    method: 'delete',
  })
}
