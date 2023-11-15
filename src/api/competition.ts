import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: Competition[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/competition',
    method: 'get',
    params: { sortField: 'order', sortOrder: 'asc', ...params },
  })
}

export function add(data: Competition) {
  return request({
    url: 'http://8.142.32.7:8888/competition',
    method: 'post',
    data,
  })
}
export function put(data: Competition) {
  return request({
    url: 'http://8.142.32.7:8888/competition',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/competition?id=${id}`,
    method: 'delete',
  })
}
