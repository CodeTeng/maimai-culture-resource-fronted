<script setup>
import { ref, onMounted } from 'vue'
import { getUserInfoApi } from '@/services/user.js'
import { useRoute } from 'vue-router'
import MyNavBar from '@/components/MyNavBar.vue'

const user = ref({})
const route = useRoute()
const getUserInfo = async () => {
  const id = route.params.id
  const res = await getUserInfoApi(id)
  user.value = res.data
}
onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <my-nav-bar :title="`${user.username}的个人信息`" />
  <div style="padding-top: 60px; margin-left: -10px; min-width: 380px">
    <van-cell-group inset>
      <van-cell title="用户头像" center>
        <template #value>
          <van-image round width="70" height="70" :src="user.userAvatar" />
        </template>
      </van-cell>
      <van-cell title="用户账号" :value="user.username" />
      <van-cell title="用户性别">
        <template #value>
          <van-tag type="primary" v-if="user.userGender === 0">男</van-tag>
          <van-tag type="danger" v-if="user.userGender === 1">女</van-tag>
        </template>
      </van-cell>
      <van-cell title="用户真实姓名" :value="user.userRealName" />
      <van-cell title="用户生日" :value="user.userBirthday" />
      <van-cell title="用户邮箱" :value="user.userEmail" />
      <van-cell title="用户手机号" :value="user.userPhone" />
      <van-cell title="用户简介" :value="user.userProfile" />
      <van-cell title="用户状态">
        <template #value>
          <van-tag type="primary" v-if="user.userStatus === 1">正常</van-tag>
          <van-tag type="danger" v-if="user.userStatus === 0">禁用</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped lang="scss"></style>
