<script setup>
import { useRouter } from 'vue-router'

defineProps({
  item: Object
})
const router = useRouter()
</script>

<template>
  <van-card>
    <template #thumb>
      <div @click="router.push(`/articleInfo/${item.id}`)">
        <van-image :src="item.articleCover" />
      </div>
    </template>
    <template #title>
      <div style="font-weight: bold" @click="router.push(`/articleInfo/${item.id}`)">
        <van-text-ellipsis :content="item.articleTitle" />
      </div>
    </template>
    <template #desc>
      <div style="font-weight: bold; color: #b3b4b6" @click="router.push(`/articleInfo/${item.id}`)">
        <van-text-ellipsis rows="3" :content="item.articleContent" />
      </div>
    </template>
    <template #price>
      <div
        style="display: flex; align-items: center"
        @click="router.push(`/userInfo/${item.userId}`)"
      >
        <div style="height: 30px; width: 30px">
          <van-image round :src="item.userAvatar" />
        </div>
        <div style="margin-left: 5px">{{ item.username }}</div>
      </div>
    </template>
    <template #footer>
      <van-tag plain type="primary">收藏数:{{ item.favTimes }}</van-tag>
      <van-divider vertical dashed />
      <van-tag plain type="success">评论数:{{ item.replyTimes }}</van-tag>
    </template>
  </van-card>
</template>

<style scoped lang="scss">
::v-deep {
  .van-card__thumb {
    width: 200px;
    height: 100px;
  }
}
</style>
