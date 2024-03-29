<script setup>
import { ref, onMounted } from 'vue'
import {
  getFriendsApi,
  getFromListApi,
  getNoReadCountApi,
  getReceiveListApi,
  readFriendApi
} from '@/services/friend.js'
import FromFriendUserCard from '@/views/Friend/components/FromFriendUserCard.vue'
import ReceiveFriendUserCard from '@/views/Friend/components/ReceiveFriendUserCard.vue'
import FriendUserCard from '@/views/Friend/components/FriendUserCard.vue'
import { showConfirmDialog, showSuccessToast } from 'vant'

const active = ref(0)
const friendList = ref([])
const fromList = ref([])
const receiveList = ref([])
const isShow = ref(false)
const getFromList = async () => {
  const res = await getFromListApi()
  fromList.value = res.data
}
const getReceiveList = async () => {
  const res = await getReceiveListApi()
  receiveList.value = res.data
}
const getFriendList = async () => {
  const res = await getFriendsApi()
  friendList.value = res.data
}
const getNoReadCount = async () => {
  const res = await getNoReadCountApi()
  isShow.value = res.data > 0
}
const read = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确定要已读完吗？'
  })
  const ids = receiveList.value.map((item) => item.id)
  await readFriendApi({ ids })
  showSuccessToast('已读成功')
  await getNoReadCount()
}
onMounted(() => {
  getFriendList()
  getFromList()
  getReceiveList()
  getNoReadCount()
})
</script>

<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>红色资源</h1>
        <van-tabs v-model:active="active">
          <van-tab title="我的好友">
            <friend-user-card
              v-for="item in friendList"
              :key="item.id"
              :item="item"
              @get-friend-list="getFriendList"
            />
            <van-empty
              v-if="friendList.length === 0"
              description="你还没有好友"
            />
          </van-tab>
          <van-tab title="好友申请">
            <from-friend-user-card
              v-for="item in fromList"
              :key="item.id"
              :item="item"
              @get-from-list="getFromList"
            />
            <van-empty
              v-if="fromList.length === 0"
              description="你还没有发起好友申请"
            />
          </van-tab>
          <van-tab title="收到申请" :dot="isShow">
            <van-button type="primary" size="mini" @click="read"
              >全部已读</van-button
            >
            <receive-friend-user-card
              v-for="item in receiveList"
              :key="item.id"
              :item="item"
              @get-receive-list="getReceiveList"
              @get-no-read-count="getNoReadCount"
            />
            <van-empty
              v-if="receiveList.length === 0"
              description="你还没有收到好友申请"
            />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  padding-bottom: 50px;
}

.home-header {
  height: 100px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }

  .con {
    position: relative;
    padding: 0 15px;

    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }
  }
}
</style>
