import request from '@/utils/request.js'

// 查看我评论的数量
export const getMyReplyCountApi = () => {
  return request.get('/replies/getMyReplyCount')
}

// 新增回复或评论
export const addReplyApi = (data) => {
  return request.post('/replies/addReply', data)
}

// 分页查询评论列表
export const pageReplyApi = (data) => {
  return request.post('/replies/pageReply', data)
}

// 分页查询我的评论列表
export const queryMyReplyPageApi = (data) => {
  return request.post('/replies/queryMyReplyPage', data)
}

// 删除我的评论
export const deleteMyReplyApi = (id) => {
  return request.delete(`/replies/deleteMyReply/${id}`)
}
