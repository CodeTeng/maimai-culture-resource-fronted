<script setup>
defineProps({
  name: String
})
</script>

<template>
  <svg aria-hidden="true" class="cp-icon">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped lang="scss">
.cp-icon {
  // 和字体一样大
  width: 1em;
  height: 1em;
}
</style>
