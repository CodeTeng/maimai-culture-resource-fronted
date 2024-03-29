<script setup>
import { ref } from 'vue'
import { userLoginApi } from '@/services/user.js'
import { usernameRules, userPasswordRules } from '@/utils/rules.js'
import { useUserStore } from '@/stores/index.js'
import { showSuccessToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import MyIcon from '@/components/MyIcon.vue'

const username = ref('')
const userPassword = ref('')
const isShow = ref(false)
const useStore = useUserStore()
const router = useRouter()
const route = useRoute()
const onSubmit = async () => {
  const res = await userLoginApi({
    username: username.value,
    userPassword: userPassword.value
  })
  // 登录成功 存储用户信息 跳转到上次页面
  useStore.setUser(res.data)
  showSuccessToast('登录成功')
  router.replace(route.query.returnUrl || '/')
}
</script>

<template>
  <div style="padding-top: 60px; margin-left: -20px; min-width: 380px">
    <div class="center">
      <img alt="红色草原" class="img" src="@/assets/avatar.jpg" />
    </div>
    <div style="padding-top: 20px" />
    <van-row justify="center">
      <h3>"红色草原 —— 文化资源用户登录页面"</h3>
    </van-row>
    <div style="margin: 14px; padding-top: 20px">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            required
            v-model="username"
            :rules="usernameRules"
            label="用户账号"
            name="username"
            placeholder="请输入用户账号"
          />
          <van-field
            required
            v-model="userPassword"
            :rules="userPasswordRules"
            label="用户密码"
            name="userPassword"
            placeholder="请输入用户密码"
            :type="isShow ? 'text' : 'password'"
          >
            <template #button>
              <my-icon
                @click="isShow = !isShow"
                :name="`login-eye-${isShow ? 'on' : 'off'}`"
                style="margin-right: 10px"
              ></my-icon>
            </template>
          </van-field>
        </van-cell-group>
        <div class="longin">
          <van-button
            plain
            class="defaultLogin"
            round
            native-type="submit"
            type="primary"
          >
            <van-icon name="lock" />
            账号密码登录
          </van-button>
        </div>
        <van-cell
          title=""
          to="/register"
          value="还没有账号？点击注册"
        ></van-cell>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/public.css';

.longin {
  margin: 16px 14px 0 12%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.defaultLogin {
  flex: auto;
  min-width: 140px;
  margin-right: 10px;
}
</style>
