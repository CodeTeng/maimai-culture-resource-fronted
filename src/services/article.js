import request from '@/utils/request.js'

// 根据条件查询文章
export const getArticleListApi = (params) => {
  return request.get('/articles/searchArticle', {
    params
  })
}

// 查看我收藏文章数量
export const getMyFavArticleCountApi = () => {
  return request.get('/articles/myFavArticleCount')
}

// 查看我收藏的文章
export const getMyFavArticleListApi = (params) => {
  return request.get('/articles/getMyFavArticle', {
    params
  })
}

// 浏览文章
export const getArticleDetailApi = (id) => {
  return request.get(`articles/getArticleDetail/${id}`)
}

// 收藏或取消收藏文章 0-收藏 1-取消收藏
export const favOrCancelFavArticleApi = (id, type) => {
  return request.get(`/articles/favOrCancelFav/${id}`, {
    params: type
  })
}

// 分页搜索所有文章
export const searchArticlePageApi = (data) => {
  return request.post('/articles/searchPageArticle', data)
}
