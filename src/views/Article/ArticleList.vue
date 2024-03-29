<script setup>
import ArticleInfoCard from '@/views/Article/ArticleInfoCard.vue'
import { ref } from 'vue'
import { getArticlePageApi } from '@/services/article.js'

const props = defineProps({
  tagId: String,
  keyword: String
})
const searchForm = ref({
  pageNo: 1,
  pageSize: 5,
  keyword: props.keyword || '',
  tagId: props.tagId
})
const articleList = ref([])
const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  // 加载更多
  const res = await getArticlePageApi(searchForm.value)
  articleList.value.push(...res.data.list)
  if (searchForm.value.pageNo >= res.data.pages) {
    finished.value = true
  } else {
    searchForm.value.pageNo++
  }
  loading.value = false
}
</script>

<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <article-info-card
      v-for="item in articleList"
      :key="item.id"
      :item="item"
    />
  </van-list>
</template>

<style scoped lang="scss"></style>
