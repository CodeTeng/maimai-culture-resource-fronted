<script setup>
import { ref } from 'vue'
import MyIcon from '@/components/MyIcon.vue'
import { getTagListApi } from '@/services/tag.js'
import ArticleList from '@/views/Article/components/ArticleList.vue'

const active = ref(0)
const tagList = ref([])
const keyword = ref('')
const getTagList = async () => {
  const res = await getTagListApi()
  tagList.value = res.data
}
getTagList()
</script>

<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>红色资源</h1>
        <div class="search">
          <my-icon name="home-search" />
          搜一搜：红色文化/文化精神/传统文化/红色草原
        </div>
      </div>
    </div>
    <!-- 标签 -->
    <div>
      <van-tabs v-model:active="active">
        <van-tab v-for="item in tagList" :key="item.id" :title="item.tagName">
          <ArticleList :keyword="keyword" :tag-id="item.id" />
        </van-tab>
      </van-tabs>
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

    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--cp-dark);
      font-size: 13px;

      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}
</style>
