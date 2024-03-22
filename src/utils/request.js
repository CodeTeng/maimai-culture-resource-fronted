import axios from 'axios'
import router from '@/router'
import { showFailToast } from 'vant'

const isDev = import.meta.env.NODE_ENV === 'development'
const request = axios.create({
  baseURL: isDev ? 'http://localhost:8080/api' : '线上地址',
  timeout: 10000
})

request.defaults.withCredentials = true
request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    if (res?.data?.code !== 10000) {
      showFailToast(res.data.message || '业务失败')
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    if (err.response?.status === 401) {
      // 跳转登录 带上接口失效的地址，用于登录后跳回
      router.push({
        path: '/login',
        query: {
          returnUrl: router.currentRoute.value.fullPath
        }
      })
    }
    return Promise.reject(err)
  }
)

export default { request }
