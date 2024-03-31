<script setup>
import { ref, onBeforeUpdate, computed, onMounted } from 'vue'
import { showSuccessToast, showToast } from 'vant'
import { getTagListApi } from '@/services/tag.js'
import { updateMyUserTagsApi } from '@/services/user.js'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
import MyNavBar from '@/components/MyNavBar.vue'

const router = useRouter()
const userStore = useUserStore()
const checked = ref([])
const checkboxRefs = ref([])
const tagList = ref([])
const toggle = (index) => {
  checkboxRefs.value[index].toggle()
}
onBeforeUpdate(() => {
  console.log(userStore.user.userTags)
  checkboxRefs.value = []
})
const getUserTagList = () => {
  for (let i = 0; i < userStore.user.userTags.length; i++) {
    const tag = userStore.user.userTags[i]
    for (let j = 0; j < tagList.value.length; j++) {
      if (tagList.value[j].tagName === tag) {
        checked.value.push(tagList.value[j])
        break
      }
    }
  }
}
const getTagList = async () => {
  const res = await getTagListApi()
  tagList.value = res.data
}
onMounted(async () => {
  await getTagList()
  getUserTagList()
})

const isDisabled = computed(() => {
  return checked.value.length < 4
})
const onSelect = async () => {
  if (checked.value.length < 4) {
    return showToast('请先选择标签')
  }
  const tagNameList = checked.value.map((item) => item.tagName)
  await updateMyUserTagsApi(tagNameList)
  // 更新 userStore
  userStore.user.userTags = tagNameList
  showSuccessToast('选择成功')
  // 跳转到首页
  router.push('/')
}
</script>

<template>
  <my-nav-bar v-if="userStore.user.userTags !== null" title="修改标签" />
  <div style="padding-top: 40px; min-width: 350px">
    <div class="home-page">
      <!-- 头部 -->
      <div class="home-header">
        <div class="con">
          <h1>选择你感兴趣的标签</h1>
        </div>
        <div class="home-navs">
          <van-checkbox-group v-model="checked" :max="4">
            <van-cell-group inset>
              <van-cell
                v-for="(item, index) in tagList"
                clickable
                :key="item.id"
                :title="item.tagName"
                @click="toggle(index)"
              >
                <template #right-icon>
                  <van-checkbox
                    :name="item"
                    :ref="(el) => (checkboxRefs[index] = el)"
                    @click.stop
                  />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
          <div style="margin: 16px">
            <van-button
              round
              block
              @click="onSelect"
              :disabled="isDisabled"
              type="primary"
              native-type="submit"
            >
              提交
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  padding-bottom: 50px;

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
      background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
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
    }
  }

  .home-navs {
    margin: 30px 15px 0 15px;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
    }
  }
}
</style>
