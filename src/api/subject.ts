import request from '@/utils/request'

export function getList(params?: any) {
  return request({
    url: 'http://8.142.32.7:8888/subject',
    method: 'get',
    params,
  })
}

export function getSubjectAndDirectiveGroup() {
  return request({
    url: 'http://8.142.32.7:8888/subject',
    method: 'get',
    params: { withDirectiveGroup: true },
  })
}

export function doAdd(data?: any) {
  return request({
    url: 'http://8.142.32.7:8888/subject',
    method: 'post',
    data,
  })
}

export function doEdit(data: any) {
  return request({
    url: 'http://8.142.32.7:8888/subject',
    method: 'put',
    data,
  })
}

export function doDelete(id: any) {
  return request({
    url: `http://8.142.32.7:8888/subject?id=${id}`,
    method: 'delete',
  })
}
