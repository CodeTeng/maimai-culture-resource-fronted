<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { folOrCancelFolApi } from '@/services/user.js'

defineProps({
  item: Object
})
const router = useRouter()
const loading = ref(false)
const fav = async (item) => {
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
      <van-image
        round
        class="avatar"
        @click="router.push(`/userInfo/${item.userId}`)"
        :src="item.userAvatar"
      ></van-image>
      <div class="info">
        <van-image
          @click="router.push(`/articleInfo/${item.id}`)"
          :src="item.articleCover"
          height="100%"
          width="100%"
        />
      </div>
      <van-button
        :loading="loading"
        @click="fav(item)"
        class="btn"
        size="small"
        round
        >{{ item.followed === true ? '已收藏' : '+ 收藏' }}
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.knowledge-card {
  margin: 20px 20px 16px;

  .head {
    display: flex;
    align-items: center;
    height: 100px;

    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }

    .info {
      width: 200px;
      padding-right: 10px;
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
