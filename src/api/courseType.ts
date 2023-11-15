import request from '@/utils/request'

export function getList(params?: any) {
  return request({
    url: 'http://8.142.32.7:8888/lessonGroup',
    method: 'get',
    params: { sortField: 'order', sortOrder: 'asc', ...params },
  })
}

export function doAdd(data?: any) {
  return request({
    url: 'http://8.142.32.7:8888/lessonGroup',
    method: 'post',
    data,
  })
}

export function doEdit(data: any) {
  return request({
    url: 'http://8.142.32.7:8888/lessonGroup',
    method: 'put',
    data,
  })
}

export function doDelete(id: any) {
  return request({
    url: `http://8.142.32.7:8888/lessonGroup?id=${id}`,
    method: 'delete',
  })
}
