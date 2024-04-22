import axios from 'axios'
import router from '@/router'
import { closeToast, showFailToast, showLoadingToast } from 'vant'
import { useUserStore } from '@/stores/index.js'

// const isDev = import.meta.env.NODE_ENV === 'development'
const instance = axios.create({
  baseURL: 'http://localhost:8090/api',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    showLoadingToast({
      message: '请求中',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
    const userStore = useUserStore()
    if (userStore.user?.accessToken && config.headers) {
      config.headers.Authorization = userStore.user.accessToken
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    if (res?.data?.code !== 200) {
      showFailToast(res.data.message || '服务异常')
      if (res?.data?.code === 40100) {
        // 跳转登录 带上接口失效的地址，用于登录后跳回
        router.push({
          path: '/login',
          query: {
            returnUrl: router.currentRoute.value.fullPath
          }
        })
      }
      return Promise.reject(res.data)
    } else {
      closeToast()
    }
    return res.data
  },
  (err) => {
    showFailToast(err.response.data.message || '服务异常')
    if (err.response?.code === 401) {
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

export default instance
