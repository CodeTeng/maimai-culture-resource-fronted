<script setup>
import ArticleInfoCard from '@/views/Article/components/ArticleInfoCard.vue'
import { ref } from 'vue'
import { getMyFavArticleListApi } from '@/services/article.js'

const props = defineProps({
  tagId: String
})
const searchForm = ref({
  keyword: '',
  tagId: props.tagId
})
const articleList = ref([])
const getMyFavArticleList = async () => {
  // 加载更多
  const res = await getMyFavArticleListApi(searchForm.value)
  articleList.value = res.data
}
getMyFavArticleList()
</script>

<template>
  <van-search
    v-model="searchForm.keyword"
    show-action
    placeholder="请输入搜索关键词"
    @search="getMyFavArticleList"
    @cancel="getMyFavArticleList"
  />
  <article-info-card v-for="item in articleList" :key="item.id" :item="item" />
  <van-empty v-if="articleList.length === 0" description="暂时没有文章" />
</template>

<style scoped lang="scss"></style>
