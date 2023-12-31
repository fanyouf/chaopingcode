import request from '@/utils/request'

/**
 * 上传单张图片
 * @param data {file: FormData}
 * @returns
 */
export function upload(data?: any) {
  return request({
    url: 'http://8.142.32.7:8888/file/upload-image',
    method: 'post',
    data,
  })
}

/**
 * 上传普通文件
 * @param data {file: FormData}
 * @returns
 */
export function uploadFile(data?: any) {
  return request({
    url: 'http://8.142.32.7:8888/file/upload',
    method: 'post',
    data,
  })
}
