<script setup>
import MyIcon from '@/components/MyIcon.vue'
</script>

<template>
  <div class="layout-page">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/home"
        >主页
        <template #icon="{ active }">
          <my-icon
            :name="`home-index-${active ? 'active' : 'default'}`"
          ></my-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        红色资源
        <template #icon="{ active }">
          <my-icon
            :name="`home-resource-${active ? 'active' : 'default'}`"
          ></my-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/friend">
        好友
        <template #icon="{ active }">
          <my-icon
            :name="`home-friend-${active ? 'active' : 'default'}`"
          ></my-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        我的
        <template #icon="{ active }">
          <my-icon
            :name="`home-mine-${active ? 'active' : 'default'}`"
          ></my-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }

      &__text {
        font-size: 11px;
      }

      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
