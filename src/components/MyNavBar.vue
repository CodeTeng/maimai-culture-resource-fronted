<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: String,
  rightText: String,
  back: () => {}
})
const emit = defineEmits(['click-right'])
const onClickRight = () => {
  emit('click-right')
}
const router = useRouter()
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }
  if (history.state?.back) {
    // 有访问历史记录 回退
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <van-nav-bar
    fixed
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    left-arrow
  />
</template>

<style scoped lang="scss">
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text1);
      font-size: 18px;
    }

    &__title {
      font-size: 15px;
    }
  }
}
</style>
