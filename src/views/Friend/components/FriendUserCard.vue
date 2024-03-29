<script setup>
import { useRouter } from 'vue-router'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { deleteFriendApi } from '@/services/friend.js'

defineProps({
  item: Object
})
const emit = defineEmits(['getFriendList'])
const router = useRouter()
const deleteFriend = async (id) => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确定要删除该好友吗？'
  })
  await deleteFriendApi(id)
  showSuccessToast('删除成功')
  // 通知父级组件
  emit('getFriendList')
}
const chat = (id) => {
  showToast('暂未开发')
  console.log(id)
  console.log('模拟聊天')
}
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head" v-if="item.id">
      <van-image
        round
        class="avatar"
        :src="item.applyUser.userAvatar"
      ></van-image>
      <div class="info" @click="router.push(`/userInfo/${item.applyUser.id}`)">
        <p class="name">{{ item.applyUser.username }}</p>
        <p class="dep van-ellipsis">
          <span v-if="item.applyUser.userAge">{{
            `${item.applyUser.userAge}岁`
          }}</span>
          {{ item.applyUser.userGender === 0 ? '男' : '女' }}
          {{ item.applyUser.userPhone }}
        </p>
      </div>
      <van-button type="primary" size="mini" @click="chat(item.applyUser.id)"
        >私聊</van-button
      >
      <van-button type="danger" size="mini" @click="deleteFriend(item.id)"
        >删除</van-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.knowledge-card {
  margin: 15px 20px 16px;

  .head {
    display: flex;
    align-items: center;

    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }

    .info {
      width: 200px;
      padding-right: 10px;

      .name {
        color: var(--cp-text2);
      }

      .dep {
        color: var(--cp-tip);
        font-size: 12px;
      }
    }

    .btn {
      padding: 0 12px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 72px;
    }
  }
}
</style>
