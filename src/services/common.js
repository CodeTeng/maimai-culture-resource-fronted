import request from '@/utils/request.js'

// 上传文件
export const uploadFileApi = (formData) => {
  return request.post('/image/upload', formData)
}
