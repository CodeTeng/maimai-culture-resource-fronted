import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 用户信息
    const user = ref()
    // 设置用户 登陆后使用
    const setUser = (u) => {
      user.value = u
    }
    // 清空用户 退出后使用
    const removeUser = () => {
      user.value = undefined
    }
    return {
      user,
      setUser,
      removeUser
    }
  },
  {
    persist: true
  }
)
