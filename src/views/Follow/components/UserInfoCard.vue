<script setup>
import { ref } from 'vue'
import { folOrCancelFolApi } from '@/services/user.js'
import { useRouter } from 'vue-router'

defineProps({
  item: Object
})
const router = useRouter()
const loading = ref(false)
const follow = async (item) => {
  loading.value = true
  try {
    await folOrCancelFolApi(item.id, {
      type: item.followed === true ? 1 : 0
    })
    item.followed = item.followed !== true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image round class="avatar" :src="item.userAvatar"></van-image>
      <div class="info" @click="router.push(`/userInfo/${item.id}`)">
        <p class="name">{{ item.username }}</p>
        <p class="dep van-ellipsis">
          <span v-if="item.userAge">{{ `${item.userAge}岁` }}</span>
          {{ item.userGender === 0 ? '男' : '女' }}
          {{ item.userPhone }}
        </p>
        <p v-if="item.userProfile" class="dep van-ellipsis">
          {{ `个人简介:${item.userProfile}` }}
        </p>
      </div>
      <van-button
        :loading="loading"
        @click="follow(item)"
        class="btn"
        size="small"
        round
        >{{ item.followed === true ? '已关注' : '+ 关注' }}
      </van-button>
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
