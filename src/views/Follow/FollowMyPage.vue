<script setup>
import { ref } from 'vue'
import { getFollowMyPageApi } from '@/services/user.js'
import MyNavBar from '@/components/MyNavBar.vue'
import UserInfoCard from '@/views/Follow/components/UserInfoCard.vue'

const searchForm = ref({
  pageNo: 1,
  pageSize: 5,
  keyword: ''
})
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const getMyFollow = async () => {
  const res = await getFollowMyPageApi(searchForm.value)
  if (searchForm.value.pageNo === 1) {
    list.value = res.data.list
  } else {
    list.value.push(...res.data.list)
  }
  if (searchForm.value.pageNo >= res.data.total) {
    finished.value = true
  } else {
    searchForm.value.pageNo++
  }
  loading.value = false
}
const onSearch = () => {
  searchForm.value.pageNo = 1
  getMyFollow()
}
</script>

<template>
  <my-nav-bar title="我的粉丝" right-text="" />
  <div style="margin-top: 40px; min-width: 370px">
    <div>
      <van-search
        v-model="searchForm.keyword"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onSearch"
      />
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getMyFollow"
      >
        <user-info-card v-for="item in list" :key="item.id" :item="item" />
      </van-list>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
