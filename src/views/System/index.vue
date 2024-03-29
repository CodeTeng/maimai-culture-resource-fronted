<script setup>
import MyNavBar from '@/components/MyNavBar.vue'
</script>

<template>
  <my-nav-bar title="系统设置" />
  <div style="padding-top: 60px; min-width: 350px">
    <div>
      <van-watermark content="张筱雨专属" />
      <van-cell title="作者" value="张筱雨" style="font-weight: bold" />
      <van-cell title="学校" value="重庆交通大学" style="font-weight: bold" />
      <van-cell
        title="专业"
        value="信息科学与工程学院-计算机科学与技术"
        style="font-weight: bold"
      />
      <van-cell title="班级" value="2001班" style="font-weight: bold" />
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>【进度】开始开发</h3>
          <p>2024-03-20</p>
        </van-step>
        <van-step>
          <h3>【进度】后端编写</h3>
          <p>2024-03-21</p>
        </van-step>
        <van-step>
          <h3>【进度】前端编写</h3>
          <p>2024-03-22</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
