<script setup>
import { ref } from 'vue'
import { getTagListApi } from '@/services/tag.js'
import MyNavBar from '@/components/MyNavBar.vue'
import MyArticleList from '@/views/Article/components/MyArticleList.vue'

const active = ref(0)
const tagList = ref([])
const getTagList = async () => {
  const res = await getTagListApi()
  tagList.value = res.data
}
getTagList()
</script>

<template>
  <my-nav-bar title="我的收藏" />
  <div style="padding-top: 40px; margin-left: -5px; min-width: 380px">
    <van-tabs v-model:active="active">
      <van-tab v-for="item in tagList" :key="item.id" :title="item.tagName">
        <my-article-list :tag-id="item.id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
