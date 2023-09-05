import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    id: number
    type: 'image' | 'text'
    pageIndex: number
    pageSize: number
    list: Directive[]
    total: number
    title: string
  }>({
    url: 'http://8.142.32.7:8888/directiveGroup',
    method: 'get',
    params,
  })
}

export function add(data: DirectiveGroup) {
  return request({
    url: 'http://8.142.32.7:8888/directiveGroup',
    method: 'post',
    data,
  })
}
export function put(data: DirectiveGroup) {
  return request({
    url: 'http://8.142.32.7:8888/directiveGroup',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/directiveGroup?id=${id}`,
    method: 'delete',
  })
}
