<script setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { ref, onMounted } from 'vue'
import { usernameRules, mobileRules } from '@/utils/rules.js'
import { useUserStore } from '@/stores/index.js'
import { getCurrentUserApi, updateMyUserInfoApi } from '@/services/user.js'
import { showSuccessToast, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { uploadFileApi } from '@/services/common.js'

const userStore = useUserStore()
const currentUser = userStore.user
const user = ref({})
const minDate = new Date(1900, 0, 1)
const maxDate = new Date()
const currentDate = ref([])
const getUserInfo = async () => {
  const res = await getCurrentUserApi()
  user.value = res.data
}
onMounted(() => {
  getUserInfo()
})
const showPicker = ref(false)
const onConfirm = ({ selectedValues }) => {
  user.value.userBirthday = selectedValues.join('-')
  showPicker.value = false
}
const router = useRouter()
const onSubmit = async () => {
  await updateMyUserInfoApi(user.value)
  // 更新成功 重新更新用户仓库数据
  const { accessToken } = currentUser
  const newUser = { ...user.value }
  newUser.accessToken = accessToken
  userStore.setUser(newUser)
  showSuccessToast('更新成功')
  router.push('/user')
}
const imageTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'image/svg'
]
const beforeRead = (file) => {
  if (!imageTypes.includes(file.type)) {
    showToast('图片类型必须为jpg,png,gif,svg中的一种')
    return false
  }
  return true
}
const onOversize = (file) => {
  if (file.size > 2 * 1024 * 1024) {
    return showToast('文件大小不能超过 2M')
  }
}
const afterRead = async (file) => {
  // 此时可以自行将文件上传至服务器
  const formData = new FormData()
  formData.append('biz', 'user_avatar')
  formData.append('file', file.file)
  const res = await uploadFileApi(formData)
  user.value.userAvatar = res.data
  showSuccessToast('上传成功')
}
const onTimerPicker = () => {
  showPicker.value = true
  currentDate.value = user.value.userBirthday.split('-')
}
</script>

<template>
  <my-nav-bar title="个人信息" />
  <div style="padding-top: 60px; margin-left: -10px; min-width: 380px">
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            style="align-items: center"
            name="uploader"
            label="用户头像"
          >
            <template #input>
              <van-uploader
                :after-read="afterRead"
                :before-read="beforeRead"
                accept="image/*"
                class="avatar"
                :max-size="1024 * 2 * 1024"
                @oversize="onOversize"
              >
                <img class="avatar" :src="user.userAvatar" alt="" />
              </van-uploader>
            </template>
          </van-field>
          <van-field
            required
            disabled
            v-model="user.username"
            :rules="usernameRules"
            label="用户账号"
            name="username"
            placeholder="请输入用户账号"
          />
          <van-field required name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="user.userGender" direction="horizontal">
                <van-radio :name="0">男</van-radio>
                <van-radio :name="1">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            required
            :rules="mobileRules"
            v-model="user.userPhone"
            :maxlength="11"
            type="tel"
            placeholder="请输入你的手机号"
            label="手机号"
          />
          <van-field
            v-model="user.userRealName"
            label="真实姓名"
            placeholder="请输入真实姓名"
          />
          <van-field
            v-model="user.userAge"
            type="digit"
            label="用户年龄"
            placeholder="请输入你的年龄"
          />
          <van-field
            v-model="user.userEmail"
            label="用户邮箱"
            type="email"
            placeholder="请输入你的邮箱"
          />
          <van-field
            v-model="user.userBirthday"
            is-link
            readonly
            name="datePicker"
            label="你的生日"
            placeholder="点击选择时间"
            @click="onTimerPicker"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-date-picker
              @confirm="onConfirm"
              :min-date="minDate"
              :max-date="maxDate"
              v-model="currentDate"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            v-model="user.userProfile"
            rows="2"
            autosize
            label="用户简介"
            type="textarea"
            maxlength="50"
            placeholder="请输入你的简介"
            show-word-limit
          />
          <div class="longin">
            <van-button
              block
              class="defaultLogin"
              native-type="submit"
              round
              type="primary"
            >
              修改信息
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

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
