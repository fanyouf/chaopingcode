import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: KnowledgeGroup[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/knowledgeGroup',
    method: 'get',
    params: { sortField: 'order', sortOrder: 'asc', ...params },
  })
}

export function add(data: KnowledgeGroup) {
  return request({
    url: 'http://8.142.32.7:8888/knowledgeGroup',
    method: 'post',
    data,
  })
}
export function put(data: KnowledgeGroup) {
  return request({
    url: 'http://8.142.32.7:8888/knowledgeGroup',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/knowledgeGroup?id=${id}`,
    method: 'delete',
  })
}
