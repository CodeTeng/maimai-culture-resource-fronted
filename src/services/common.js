import request from '@/utils/request.js'

// 上传文件
export const uploadFileApi = (formData) => {
  return request.post('/image/upload', formData)
}

// 发送短信
export const sendMobileCode = (userPhone) => {
  return request.get('/sendSmsCode', {
    params: userPhone
  })
}
