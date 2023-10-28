import request from '@/utils/request'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    subject: Subject
    total: number
  }>({
    url: 'http://8.142.32.7:8888/lesson',
    method: 'get',
    params,
  })
}

export function add(data: any) {
  return request({
    url: 'http://8.142.32.7:8888/lesson',
    method: 'post',
    data,
  })
}
export function put(data: KnowledgeGroup) {
  return request({
    url: 'http://8.142.32.7:8888/lesson',
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
