<script setup>
import { ref, onMounted } from 'vue'
import MyIcon from '@/components/MyIcon.vue'
import {
  getCurrentUserApi,
  getMyFavCountApi,
  getMyFriendsCountApi
} from '@/services/user.js'
import { getMyFavArticleCountApi } from '@/services/article.js'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const currentUser = ref({})
const myFavCount = ref(0)
const favMyCount = ref(0)
const myFavArticleCount = ref(0)
const myFriendsCount = ref(0)
const getCurrentUser = async () => {
  const res = await getCurrentUserApi()
  currentUser.value = res.data
}
const getMyFavCount = async () => {
  const res = await getMyFavCountApi({
    type: 0
  })
  myFavCount.value = res.data
}
const getFavMyCount = async () => {
  const res = await getMyFavCountApi({
    type: 1
  })
  favMyCount.value = res.data
}
const getMyFacArticleCount = async () => {
  const res = await getMyFavArticleCountApi()
  myFavArticleCount.value = res.data
}
const getMyFriendsCount = async () => {
  const res = await getMyFriendsCountApi()
  myFriendsCount.value = res.data
}
onMounted(() => {
  getCurrentUser()
  getMyFavCount()
  getMyFacArticleCount()
  getFavMyCount()
  getMyFriendsCount()
})
const router = useRouter()
const userStore = useUserStore()
const onLogout = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确定要退出红色文化吗？'
  })
  // 清除用户仓库 跳转到登录页
  userStore.removeUser()
  router.push('/login')
}

const tools = [
  { label: '红色资源', path: '/article' },
  { label: '我的好友', path: '/friend' },
  { label: '我的关注', path: '/user/myFollow' },
  { label: '修改密码', path: '/user/updatePwd' },
  { label: '修改标签', path: '/select' },
  { label: '我的评论', path: '/user/comment' },
  { label: '添加好友', path: '/friend/add' },
  { label: '系统设置', path: '/system' }
]
</script>

<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="currentUser.userAvatar" />
        <div class="user" @click="router.push('/user/userInfo')">
          <p>{{ currentUser.username }}</p>
          <p>
            <span>{{ currentUser.userProfile }}</span>
            <van-icon name="edit" />
          </p>
        </div>
      </div>
      <van-row>
        <van-col span="6" @click="router.push('/user/myFav')">
          <p>{{ myFavArticleCount }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6" @click="router.push('/user/myFollow')">
          <p>{{ myFavCount }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6" @click="router.push('/friend')">
          <p>{{ myFriendsCount }}</p>
          <p>好友</p>
        </van-col>
        <van-col span="6" @click="router.push('/user/followMy')">
          <p>{{ favMyCount }}</p>
          <p>粉丝</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order" v-if="currentUser.userRole === 'admin'">
      <div class="head">
        <h3>红色文化</h3>
        <router-link to="/my/article">
          全部文章
          <van-icon name="arrow" />
        </router-link>
      </div>
      <van-row>
        <van-col span="6">
          <my-icon name="user-paid" />
          <p>公开</p>
        </van-col>
        <van-col span="6">
          <my-icon name="user-shipped" />
          <p>私密</p>
        </van-col>
        <van-col span="6">
          <my-icon name="user-received" />
          <p>回收站</p>
        </van-col>
        <van-col span="6">
          <my-icon name="user-finished" />
          <p>草稿</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :key="item.label"
        :title="item.label"
        :to="item.path"
        is-link
        :border="false"
      >
        <template #icon>
          <my-icon :name="`user-tool-0${index + 1}`" />
        </template>
      </van-cell>
      <a class="logout" href="javascript:;" @click="onLogout">退出登录</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(
        180deg,
        rgba(206, 62, 96, 0.85),
        rgba(44, 181, 165, 0)
    );
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;

      .van-image {
        width: 70px;
        height: 70px;
      }

      .user {
        padding-left: 10px;
        width: 100%;
        overflow: hidden;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }

          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
            width: 100%;
            overflow: hidden;

            span {
            }
          }
        }
      }
    }

    .van-row {
      margin: 0 -15px;
      padding-top: 15px;

      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }

  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;

      a {
        color: var(--cp-tip);
      }
    }

    .van-col {
      text-align: center;

      .cp-icon {
        font-size: 28px;
      }

      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }

  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      padding-left: 16px;
      line-height: 44px;
    }

    .van-cell {
      align-items: center;
    }

    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }

  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
