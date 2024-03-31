import request from '@/utils/request.js'

// 用户登录
export const userLoginApi = ({ username, userPassword }) => {
  return request.post('/users/login', { username, userPassword })
}

// 用户注册
export const userRegisterApi = ({ username, userPassword, checkPassword }) => {
  return request.post('/users/register', {
    username,
    userPassword,
    checkPassword
  })
}

// 获取当前登录用户
export const getCurrentUserApi = () => {
  return request.get('/users/current')
}

// 修改我的个人信息
export const updateMyUserInfoApi = (data) => {
  return request.put('/users/updateMyInfo', data)
}

// 当前用户个人修改密码
export const updateMyPwdApi = (data) => {
  return request.put('/users/update/myPwd', data)
}

// 我的文章数量
export const getMyArticleCountApi = () => {
  return request.get('/users/myArticleCount')
}

// 我关注人员数量
export const getMyFavCountApi = (type) => {
  return request.get('/users/myFavCount', {
    params: type
  })
}

// 我的好友数量
export const getMyFriendsCountApi = () => {
  return request.get('/users/myFriendsCount')
}

// 分页查看我关注的用户
export const getMyFollowPageApi = (data) => {
  return request.post('/users/getMyFolUser', data)
}

// 分页查看关注我的用户
export const getFollowMyPageApi = (data) => {
  return request.post('/users/getFolMyUser', data)
}

// 关注或取消关注用户 0-关注 1-取消关注
export const folOrCancelFolApi = (id, type) => {
  return request.get(`/users/folOrCancelFol/${id}`, {
    params: type
  })
}

// 查看用户
export const getUserInfoApi = (id) => {
  return request.get(`/users/getUserDetail/${id}`)
}

// 更新我的标签
export const updateMyUserTagsApi = (data) => {
  return request.put('/users/update/tags', data)
}
