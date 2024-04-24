<script setup>
import { ref } from 'vue'
import MyNavBar from '@/components/MyNavBar.vue'
import { showConfirmDialog } from 'vant'
import ArticleInfoCard from '@/views/Article/components/ArticleInfoCard.vue'
import { searchArticlePageApi } from '@/services/article.js'

const queryParams = ref({
  pageNo: 1,
  pageSize: 5,
  keyword: ''
})
const noSearch = ref(true)
const historySearchList = ref(
  JSON.parse(localStorage.getItem('historySearch')) || []
)
const articleList = ref([])
const initParams = (value = '') => {
  articleList.value = []
  queryParams.value = {
    pageNo: 1,
    pageSize: 5,
    keyword: value || ''
  }
}
const onSearch = (val) => {
  historySearchList.value = [
    ...new Set([queryParams.value.keyword, ...historySearchList.value])
  ].slice(0, 10)
  localStorage.setItem('historySearch', JSON.stringify(historySearchList.value))
  noSearch.value = false
  initParams(val)
  onLoad()
}
const onCancel = () => {
  noSearch.value = true
  initParams()
}
const removeHistory = () => {
  showConfirmDialog({
    title: '是否清空历史搜索?'
  }).then(() => {
    historySearchList.value = []
    localStorage.removeItem('historySearch')
  })
}

const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  // 异步更新数据
  const res = await searchArticlePageApi(queryParams.value)
  articleList.value = [...articleList.value, ...res.data.list]
  // 加载状态结束
  if (queryParams.value.pageNo >= res.data.total) {
    finished.value = true
  } else {
    queryParams.value.pageNo++
  }
  loading.value = false
}
</script>

<template>
  <div class="searchLayout">
    <my-nav-bar title="搜索" />
    <div class="search">
      <van-search
        v-model="queryParams.keyword"
        show-action
        autofocus
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @clear="onCancel"
        @cancel="onCancel"
      />
    </div>

    <div>
      <div class="history">
        <div class="topTitle">
          <div class="text">最近搜索</div>
          <div class="icon" @click="removeHistory">
            <van-icon name="delete-o" />
          </div>
        </div>
        <div class="tabs">
          <div class="tab" v-for="tab in historySearchList" :key="tab">
            {{ tab }}
          </div>
        </div>
      </div>
    </div>

    <div class="noSearch" v-if="noSearch">
      <van-empty description="你还暂未搜索" />
    </div>

    <div class="list" v-if="!noSearch">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchLayout {
  .search {
    margin-top: 40px;
    overflow: hidden;
    width: 100%;
  }

  .topTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #999;
    margin-top: 10px;

    .text {
      margin-left: 20px;
    }

    .icon {
      margin-right: 20px;
    }
  }

  .history {
    padding: 30rpx;
  }

  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 10px;

    .tab {
      background: #f4f4f4;
      font-size: 15px;
      color: #333;
      padding: 5px 18px;
      border-radius: 20px;
      margin-left: 20px;
      margin-right: 10px;
      margin-top: 10px;
    }
  }

  .list {
    padding: 20px 5px;
  }
}
</style>
