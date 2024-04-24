<script setup>
import { ref, onMounted } from 'vue'
import MyIcon from '@/components/MyIcon.vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import { option } from '@/utils/map.js'
import { useUserStore } from '@/stores/index.js'
import { getTagListApi } from '@/services/tag.js'
import ArticleList from '@/views/Article/components/ArticleList.vue'
import { useRouter } from 'vue-router'

const active = ref(0)
const videoUrls = ref([
  {
    url: 'https://vodpub1.v.news.cn/original/20240201/54f6f251a262450bae3b405390746c51.mp4'
  },
  {
    url: 'https://vodpub1.v.news.cn/original/20240331/a58c00a418a347f480dbdb3c2e23edcb.mp4'
  }
])
const mapEcharts = ref(null)
const initEcharts = () => {
  const myMap = echarts.init(mapEcharts.value)
  myMap.setOption(option)
}
const tagList = ref([])
const getTagList = async () => {
  const res = await getTagListApi()
  tagList.value = res.data
}
const userStore = useUserStore()
const userTagList = ref([])
const getUserTagList = () => {
  for (let i = 0; i < userStore.user.userTags.length; i++) {
    const tag = userStore.user.userTags[i]
    for (let j = 0; j < tagList.value.length; j++) {
      if (tagList.value[j].tagName === tag) {
        userTagList.value.push(tagList.value[j])
        break
      }
    }
  }
}
onMounted(async () => {
  initEcharts()
  await getTagList()
  getUserTagList()
})
const router = useRouter()
</script>

<template>
  <van-notice-bar
    left-icon="volume-o"
    color="red"
    text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
  />
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>红色资源</h1>
        <div class="search" @click="router.push('/search')">
          <my-icon name="home-search" />
          搜一搜：红色文化/文化精神/传统文化/红色草原
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="home-navs">
      <van-row>
        <van-col span="12" v-for="item in videoUrls" :key="item.url">
          <div class="nav">
            <div class="video-container">
              <video controls :src="item.url"></video>
            </div>
          </div>
        </van-col>
      </van-row>
      <div ref="mapEcharts" style="height: 300px; width: 100%"></div>
    </div>
    <!-- 轮播图 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff" autoplay="3000">
        <van-swipe-item>
          <img src="@/assets/swipe1.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/swipe2.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/swipe3.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/swipe4.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/swipe5.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 标签栏 -->
    <van-tabs shrink sticky v-model:active="active">
      <van-tab v-for="item in userTagList" :key="item.id" :title="item.tagName">
        <ArticleList :keyword="keyword" :tag-id="item.id" />
      </van-tab>
    </van-tabs>
    <van-back-top />
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
    background: linear-gradient(180deg, rgba(206, 62, 96, 0.85), #d81e06);
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

.home-navs {
  padding: 10px 15px 0 15px;

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;

    .video-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 44px);
      margin: 2px;

      video {
        max-width: 100%;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
      }
    }
  }
}

.home-banner {
  padding: 10px 15px;
  height: 100px;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
