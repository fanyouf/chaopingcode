import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: KnowledgeGroup[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/lessonType',
    method: 'get',
    params,
  })
}

export function add(data: KnowledgeGroup) {
  return request({
    url: 'http://8.142.32.7:8888/lessonType',
    method: 'post',
    data,
  })
}
export function put(data: KnowledgeGroup) {
  return request({
    url: 'http://8.142.32.7:8888/lessonType',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/lessonType?id=${id}`,
    method: 'delete',
  })
}
