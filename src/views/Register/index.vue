<script setup>
import { ref } from 'vue'
import { usernameRules, userPasswordRules } from '@/utils/rules.js'
import MyIcon from '@/components/MyIcon.vue'
import { userRegisterApi } from '@/services/user.js'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'

const username = ref('')
const userPassword = ref('')
const checkPassword = ref('')
const userPasswordIsShow = ref(false)
const checkPasswordIsShow = ref(false)
const router = useRouter()
const onSubmit = async () => {
  await userRegisterApi({
    username: username.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  })
  showSuccessToast('注册成功')
  router.push('/login')
}
</script>

<template>
  <div style="padding-top: 60px; margin-left: -10px; min-width: 380px">
    <div class="uploaderCenter">
      <img class="img" src="@/assets/avatar.jpg" />
    </div>
    <div style="padding-top: 8px" />
    <van-row justify="center">
      <h3>"红色草原 —— 文化资源用户注册页面"</h3>
    </van-row>
    <van-divider></van-divider>
    <div>
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
            :type="userPasswordIsShow ? 'text' : 'password'"
          >
            <template #button>
              <my-icon
                @click="userPasswordIsShow = !userPasswordIsShow"
                :name="`login-eye-${userPasswordIsShow ? 'on' : 'off'}`"
                style="margin-right: 10px"
              ></my-icon>
            </template>
          </van-field>
          <van-field
            required
            v-model="checkPassword"
            :rules="userPasswordRules"
            label="确认密码"
            name="checkPassword"
            placeholder="请再次输入密码"
            :type="checkPasswordIsShow ? 'text' : 'password'"
          >
            <template #button>
              <my-icon
                @click="checkPasswordIsShow = !checkPasswordIsShow"
                :name="`login-eye-${checkPasswordIsShow ? 'on' : 'off'}`"
                style="margin-right: 10px"
              ></my-icon>
            </template>
          </van-field>
          <div class="longin">
            <van-button
              block
              class="defaultLogin"
              native-type="submit"
              round
              type="primary"
            >
              注册账号
            </van-button>
            <van-cell
              title=""
              to="/login"
              value="已有账号？点击登录"
            ></van-cell>
          </div>
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/public.css';

.longin {
  margin: 16px 14px 0 5%;
}

.defaultLogin {
  flex: auto;
}

.uploaderCenter {
  margin-top: 8px;
  display: flex;
  justify-content: center;
}
</style>
