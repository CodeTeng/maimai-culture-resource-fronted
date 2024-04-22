<script setup>
import { ref } from 'vue'
import { usernameRules, mobileRules } from '@/utils/rules.js'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'
import { findMyPwdApi } from '@/services/user.js'

const username = ref('')
const userPhone = ref('')
const router = useRouter()
const onSubmit = async () => {
  await findMyPwdApi({
    username: username.value,
    userPhone: userPhone.value
  })
  showSuccessToast('新密码已发送到你手机')
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
      <h3>"红色草原 —— 文化资源用户找回密码页面"</h3>
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
            v-model="userPhone"
            :rules="mobileRules"
            label="用户手机号"
            name="userPhone"
            placeholder="请输入用户手机号"
          />
          <div class="longin">
            <van-button
              block
              class="defaultLogin"
              native-type="submit"
              round
              type="primary"
            >
              找回密码
            </van-button>
            <van-cell
              title=""
              to="/login"
              value="想起密码？点击登录"
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
