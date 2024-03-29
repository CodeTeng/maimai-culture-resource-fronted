import request from '@/utils/request.js'

// 分页查询文章
export const getArticlePageApi = (data) => {
  return request.post('/articles/searchArticle', data)
}

// 分页查看我收藏文章数量
export const getMyFavArticleCountApi = () => {
  return request.get('/articles/myFavArticleCount')
}

// 分页查看我收藏的文章
export const getMyFavArticlePageApi = (data) => {
  return request.post('/articles/getMyFavArticle', data)
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
