<script setup>
import ArticleInfoCard from '@/views/Article/components/ArticleInfoCard.vue'
import { ref } from 'vue'
import { getArticleListApi } from '@/services/article.js'

const props = defineProps({
  tagId: String,
  keyword: String
})
const searchForm = ref({
  keyword: props.keyword || '',
  tagId: props.tagId
})
const articleList = ref([])
const getArticleList = async () => {
  // 加载更多
  const res = await getArticleListApi(searchForm.value)
  articleList.value = res.data
}
getArticleList()
</script>

<template>
  <article-info-card v-for="item in articleList" :key="item.id" :item="item" />
  <van-empty v-if="articleList.length === 0" description="暂时没有文章" />
</template>

<style scoped lang="scss"></style>
