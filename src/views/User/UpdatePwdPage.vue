<script setup>
import { ref } from 'vue'
import { userPasswordRules } from '@/utils/rules.js'
import MyNavBar from '@/components/MyNavBar.vue'
import MyIcon from '@/components/MyIcon.vue'
import { updateMyPwdApi } from '@/services/user.js'
import { useUserStore } from '@/stores/index.js'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'

const oldPassword = ref('')
const oldPasswordIsShow = ref(false)
const userPassword = ref('')
const userPasswordIsShow = ref(false)
const checkPassword = ref('')
const checkPasswordIsShow = ref(false)
const userStore = useUserStore()
const router = useRouter()
const onSubmit = async () => {
  await updateMyPwdApi({
    oldPassword: oldPassword.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  })
  // 修改成功后 重新登录 清除本地用户仓库
  showSuccessToast('修改成功')
  userStore.removeUser()
  router.push('/login')
}
</script>

<template>
  <my-nav-bar title="修改密码" />
  <div style="padding-top: 60px; margin-left: -10px; min-width: 380px">
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            required
            v-model="oldPassword"
            :rules="userPasswordRules"
            label="原密码"
            name="oldPassword"
            placeholder="请输入原密码"
            :type="oldPasswordIsShow ? 'text' : 'password'"
          >
            <template #button>
              <my-icon
                @click="oldPasswordIsShow = !oldPasswordIsShow"
                :name="`login-eye-${oldPasswordIsShow ? 'on' : 'off'}`"
                style="margin-right: 10px"
              ></my-icon>
            </template>
          </van-field>
          <van-field
            required
            v-model="userPassword"
            :rules="userPasswordRules"
            label="新密码"
            name="userPassword"
            placeholder="请输入用户新密码"
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
              修改密码
            </van-button>
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
