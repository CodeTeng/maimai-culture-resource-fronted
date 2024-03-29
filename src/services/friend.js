import request from '@/utils/request.js'
import qs from 'qs'

// 查看我发送的好友申请
export const getFromListApi = () => {
  return request.get('/friends/getFromList')
}

// 查看我收到的好友申请
export const getReceiveListApi = () => {
  return request.get('/friends/getReceiveList')
}

// 查看我的未读消息
export const getNoReadCountApi = () => {
  return request.get('/friends/getNoReadCount')
}

// 撤销申请
export const cancelApplyApi = (id) => {
  return request.post(`/friends/canceledApply/${id}`)
}

// 同意好友申请
export const agreeApplyApi = (fromId) => {
  return request.post(`/friends/agree/${fromId}`)
}

// 分页查看我的好友
export const getFriendsApi = () => {
  return request.get('/friends/getMyFriends')
}

// 删除好友
export const deleteFriendApi = (id) => {
  return request.delete(`/friends/deleteFriend/${id}`)
}

// 添加好友
export const addFriendApi = (data) => {
  return request.post('/friends/add', data)
}

// 已读(全部已读)
export const readFriendApi = (ids) => {
  return request.get('/friends/read', {
    params: ids,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { indices: false })
      }
    }
  })
}
