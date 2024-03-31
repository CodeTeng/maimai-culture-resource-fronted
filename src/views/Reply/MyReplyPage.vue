<script setup>
import MyNavBar from '@/components/MyNavBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showSuccessToast } from 'vant'
import {
  deleteMyReplyApi,
  getMyReplyCountApi,
  queryMyReplyPageApi
} from '@/services/reply.js'
import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
const router = useRouter()
const total = ref(0)
const pageCount = ref(0)
const replyCount = ref(0)
const searchForm = ref({
  pageNo: 1,
  pageSize: 5,
  keyword: ''
})
const replyList = ref([])
const getMyReplyPageList = async () => {
  const res = await queryMyReplyPageApi(searchForm.value)
  total.value = res.data.total
  pageCount.value = res.data.pages
  replyList.value = res.data.list
}
const getMyReplyCount = async () => {
  const res = await getMyReplyCountApi()
  replyCount.value = res.data
}
getMyReplyPageList()
getMyReplyCount()
const deleteReply = async (id) => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确定要删除该评论吗？'
  })
  await deleteMyReplyApi(id)
  searchForm.value.pageNo = 1
  await getMyReplyPageList()
  await getMyReplyCount()
  showSuccessToast('删除成功')
}
const onSearch = async () => {
  searchForm.value.pageNo = 1
  await getMyReplyPageList()
}
</script>

<template>
  <my-nav-bar title="我的评论" right-text="" />
  <div style="margin-top: 40px; min-width: 370px">
    <van-search
      v-model="searchForm.keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="getMyReplyPageList"
    />
    <div class="comment">
      <div class="comment-title">
        <div class="left">我的评论 ({{ replyCount }}条)</div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in replyList" :key="item.id">
          <div class="top">
            <img :src="item.userAvatar" alt="" />
            <div class="name">{{ item.username }}</div>
            <div
              class="right"
              @click="router.push(`/articleInfo/${item.articleId}`)"
            >
              查看文章
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="content">{{ item.commentContent }}</div>
          <div class="time">
            {{ item.createTime }}
            <span style="margin-left: 60px"></span>
            <span>评论数量：{{ item.replyTimes }}</span>
            <van-divider vertical dashed />
            <van-icon
              v-if="item.userId === userStore.user.id"
              @click="deleteReply(item.id)"
              name="delete-o"
            />
          </div>
        </div>
      </div>
      <van-empty v-if="replyCount === 0" description="你还暂时未评论" />
      <van-pagination
        v-model="searchForm.pageNo"
        :total-items="total"
        :page-count="pageCount"
        :show-page-size="3"
        force-ellipses
        @change="getMyReplyPageList"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment {
  padding: 10px;
}

.comment-title {
  display: flex;
  justify-content: space-between;
}

.comment-item {
  font-size: 16px;
  line-height: 30px;

  .top {
    //width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: 20px;

    .right {
      margin-left: 180px;
      color: #959595;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
    }

    .name {
      margin: 0 10px;
    }
  }

  .time {
    color: #999;
  }
}
</style>
