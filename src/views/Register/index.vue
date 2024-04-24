<script setup>
import { ref } from 'vue'
import {
  usernameRules,
  userPasswordRules,
  mobileRules,
  codeRules
} from '@/utils/rules.js'
import MyIcon from '@/components/MyIcon.vue'
import { userRegisterApi } from '@/services/user.js'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'
import { sendMobileCode } from '@/services/common.js'

const username = ref('')
const userPassword = ref('')
const checkPassword = ref('')
const userPhone = ref('')
const code = ref('')
const time = ref(0)
let timerId
const form = ref(null)
const userPasswordIsShow = ref(false)
const checkPasswordIsShow = ref(false)
const router = useRouter()
const sendCode = async () => {
  // 已经倒计时time的值大于0，此时不能发送验证码
  if (time.value > 0) return
  // 验证不通过报错，阻止程序继续执行
  await form.value?.validate('userPhone')
  await sendMobileCode({
    userPhone: userPhone.value
  })
  showSuccessToast('发送成功')
  time.value = 60
  // 倒计时
  if (timerId) clearInterval(timerId)
  timerId = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timerId)
  }, 1000)
}
const onSubmit = async () => {
  await userRegisterApi({
    username: username.value,
    userPhone: userPhone.value,
    code: code.value,
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
      <img class="img" src="@/assets/avatar2.jpg" />
    </div>
    <div style="padding-top: 8px" />
    <van-row justify="center">
      <h3>"红色草原 —— 文化资源用户注册页面"</h3>
    </van-row>
    <van-divider></van-divider>
    <div>
      <van-form ref="form" @submit="onSubmit">
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
            v-model="userPhone"
            :rules="mobileRules"
            label="用户手机号"
            name="userPhone"
            placeholder="请输入用户手机号"
          />
          <van-field
            required
            v-model="code"
            :rules="codeRules"
            label="短信验证码"
            name="code"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <span
                class="btn-send"
                :class="{ active: time > 0 }"
                @click="sendCode"
              >
                {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
              </span>
            </template>
          </van-field>
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

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
