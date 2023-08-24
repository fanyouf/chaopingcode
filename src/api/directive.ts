import request from '@/utils/request'
import { Directive } from 'vue'

export function getList(params: any) {
  return request<{
    pageIndex: number
    pageSize: number
    list: Directive[]
    total: number
  }>({
    url: 'http://8.142.32.7:8888/directive',
    method: 'get',
    params,
  })
}

export function add(data: Directive) {
  return request({
    url: 'http://8.142.32.7:8888/directive',
    method: 'post',
    data,
  })
}
export function put(data: Directive) {
  return request({
    url: 'http://8.142.32.7:8888/directive',
    method: 'put',
    data,
  })
}

export function del(id: number) {
  return request({
    url: `http://8.142.32.7:8888/directive?id=${id}`,
    method: 'delete',
  })
}
