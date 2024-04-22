<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  favOrCancelFavArticleApi,
  getArticleDetailApi
} from '@/services/article.js'
import MyNavBar from '@/components/MyNavBar.vue'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import {
  addReplyApi,
  deleteMyReplyApi,
  pageReplyApi
} from '@/services/reply.js'
import { replyRules } from '@/utils/rules.js'
import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const article = ref({})
const loading = ref(false)
const show = ref(false)
const total = ref(0)
const pageCount = ref(0)
const childReplyShow = ref(false)
const searchForm = ref({
  pageNo: 1,
  pageSize: 5,
  articleId: id,
  answerId: undefined
})
const replyForm = ref({
  content: '',
  articleId: id,
  answerId: '',
  targetReplyId: '',
  targetUserId: ''
})
const replyList = ref([])
const fav = async () => {
  loading.value = true
  try {
    await favOrCancelFavArticleApi(id, {
      type: article.value.favStatus === true ? 1 : 0
    })
    if (article.value.favStatus === false) {
      article.value.favTimes++
      showSuccessToast('收藏成功')
    } else {
      article.value.favTimes--
      showSuccessToast('取消收藏')
    }
    article.value.favStatus = article.value.favStatus !== true
  } finally {
    loading.value = false
  }
}
const getArticleDetail = async () => {
  const res = await getArticleDetailApi(id)
  article.value = res.data
}
const getArticleReplyPageList = async () => {
  const res = await pageReplyApi(searchForm.value)
  total.value = res.data.total
  pageCount.value = res.data.pages
  replyList.value = res.data.list
}
getArticleDetail()
getArticleReplyPageList()
const onSubmit = async () => {
  await addReplyApi(replyForm.value)
  searchForm.value.pageNo = 1
  await getArticleReplyPageList()
  // 不是子评论才添加回复次数
  if (childParams.value.answerId) {
    article.value.replyTimes++
  }
  replyForm.value.content = ''
  show.value = false
  childParams.value.answerId = undefined
  showSuccessToast('评论成功')
}
const onReply = async (item) => {
  show.value = true
  replyForm.value.answerId = item.id
  replyForm.value.targetUserId = item.userId
  replyForm.value.targetReplyId = item.id
}
const childReplyList = ref([])
const childParams = ref({
  answerId: undefined,
  articleId: undefined
})
// 查询子评论
const getChildReply = async (id) => {
  childReplyShow.value = true
  childParams.value.answerId = id
  const res = await pageReplyApi(childParams.value)
  childReplyList.value = res.data.list
}
const deleteReply = async (id) => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确定要删除该评论吗？'
  })
  await deleteMyReplyApi(id)
  if (!childParams.value.answerId) {
    article.value.replyTimes--
  }
  searchForm.value.pageNo = 1
  await getArticleReplyPageList()
  childParams.value.answerId = undefined
  showSuccessToast('删除成功')
}
// 添加全局点击事件监听器
const handleClickOutside = (event) => {
  if (!event.target.closest('.childReply')) {
    // 如果点击的地方不是评论区域，则关闭子评论或其他弹出框
    childReplyShow.value = false // 关闭评论弹窗
    // 你可以添加其他关闭逻辑，例如关闭其他弹出框
  }
}
onMounted(() => {
  // 添加点击事件监听器
  document.addEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="detail-page">
    <my-nav-bar title="文章信息" />
    <header class="header">
      <h1>{{ article.articleTitle }}</h1>
      <p>
        {{ article.createTime }} | {{ article.replyTimes }} 评论量 |
        {{ article.favTimes }} 收藏数
      </p>
      <p @click="router.push(`/userInfo/${article.userId}`)">
        <img :src="article.userAvatar" alt="" />
        <span>{{ article.username }}</span>
      </p>
    </header>
    <div class="video-container" v-if="article.type === 2">
      <video controls :src="article.url"></video>
    </div>
    <main class="body" v-html="article.articleContent"></main>
    <!-- 文章评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">文章评论 ({{ article.replyTimes }}条)</div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in replyList" :key="item.id">
          <div class="top" @click="router.push(`/userInfo/${item.userId}`)">
            <img :src="item.userAvatar" alt="" />
            <div class="name">{{ item.username }}</div>
          </div>
          <div class="content">{{ item.commentContent }}</div>
          <div class="time">
            {{ item.createTime }}
            <van-divider vertical dashed />
            <span @click="getChildReply(item.id)" class="childReply"
              >评论数量：{{ item.replyTimes }}</span
            >
            <van-divider vertical dashed />
            <van-icon name="comment-o" @click="onReply(item)" />
            <van-divider vertical dashed />
            <van-icon
              v-if="item.userId === userStore.user.id"
              @click="deleteReply(item.id)"
              name="delete-o"
            />
          </div>
        </div>
      </div>
      <van-pagination
        v-model="searchForm.pageNo"
        :total-items="total"
        :page-count="pageCount"
        :show-page-size="3"
        force-ellipses
        @change="getArticleReplyPageList"
      />
    </div>
    <div class="opt">
      <van-icon name="comment-o" @click="show = true" />
      <!--      <van-icon :class="{active:article.favStatus}" name="like-o" />-->
      <van-icon
        @click="fav"
        :class="{ active: article.favStatus }"
        name="star-o"
      />
    </div>
    <van-back-top />
  </div>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
    <template #default>
      <van-form @submit="onSubmit">
        <van-field
          required
          :rules="replyRules"
          v-model="replyForm.content"
          rows="4"
          autosize
          label="评论"
          type="textarea"
          maxlength="150"
          placeholder="请输入评论"
          show-word-limit
        />
        <div>
          <van-button
            round
            block
            type="primary"
            size="normal"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </template>
  </van-popup>

  <van-floating-panel v-if="childReplyShow">
    <div class="detail-page" style="margin-top: 5px">
      <!-- 文章评价 -->
      <div class="comment" style="padding: 0">
        <div class="comment-list">
          <div class="comment-item" v-for="item in childReplyList" :key="item.id">
            <div class="top" @click="router.push(`/userInfo/${item.userId}`)">
              <img :src="item.userAvatar" alt="" />
              <div class="name">{{ item.username }}</div>
            </div>
            <div class="content">{{ item.commentContent }}</div>
            <div class="time">
              {{ item.createTime }}
              <van-divider vertical dashed />
              <van-icon
                v-if="item.userId === userStore.user.id"
                @click="deleteReply(item.id)"
                name="delete-o"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-floating-panel>
</template>

<style scoped lang="scss">
::v-deep {
  .van-field__label {
    width: 40px;
  }
}

.detail-page {
  margin-top: 40px;
  overflow: hidden;
  padding: 0 15px;

  .header {
    h1 {
      font-size: 24px;
    }

    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 44px);

    video {
      max-width: 100%;
      outline: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
    }
  }

  main {
    margin-top: 10px;
  }

  .comment {
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

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

  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;

    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;

      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
