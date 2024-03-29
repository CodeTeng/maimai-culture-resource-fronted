import request from '@/utils/request.js'

// 获取所有标签
export const getTagListApi = () => {
  return request.get('/tags/getTagList')
}
