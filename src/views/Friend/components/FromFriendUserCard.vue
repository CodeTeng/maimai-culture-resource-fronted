<script setup>
import { useRouter } from 'vue-router'
import { cancelApplyApi } from '@/services/friend.js'
import { showConfirmDialog, showSuccessToast } from 'vant'

defineProps({
  item: Object
})
const emit = defineEmits(['getFromList'])
const router = useRouter()
const cancel = async (id) => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确定要撤销好友申请吗？'
  })
  await cancelApplyApi(id)
  showSuccessToast('撤销成功')
  // 通知父级更新
  emit('getFromList')
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
        <p v-if="item.remark" class="dep">
          {{ `申请备注:${item.remark}` }}
        </p>
      </div>
      <van-tag @click="cancel(item.id)" v-if="item.status === 0" type="primary"
        >未通过
      </van-tag>
      <van-tag v-if="item.status === 1" type="success">已同意</van-tag>
      <van-tag v-if="item.status === 2" type="danger">已过期</van-tag>
      <van-tag v-if="item.status === 3" type="warning">已撤销</van-tag>
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
