<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import Home from '@/views/Home/index.vue'
import Team from '@/views/Team/index.vue'
import User from '@/views/User/index.vue'

const onClickLeft = () => history.back()
const onClickRight = () => showToast('按钮')
const active = ref('home')
const onChange = (index) => showToast(`标签 ${index}`)
</script>

<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <template v-if="active === 'home'">
      <Home />
    </template>
    <template v-if="active === 'team'">
      <Team />
    </template>
    <template v-if="active === 'user'">
      <User />
    </template>
  </div>

  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="home">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
