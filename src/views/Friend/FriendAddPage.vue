<script setup>
import { ref } from 'vue'
import MyNavBar from '@/components/MyNavBar.vue'
import { addFriendApi } from '@/services/friend.js'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'

const formData = ref({
  username: '',
  remark: ''
})
const router = useRouter()
const onSubmit = async () => {
  await addFriendApi(formData.value)
  showSuccessToast('申请成功')
  // 跳转到申请界面
  router.push('/friend')
}
</script>

<template>
  <my-nav-bar title="添加好友" right-text="" />
  <div style="margin-top: 40px; min-width: 370px">
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            required
            v-model="formData.username"
            name="用户账号"
            label="用户账号"
            placeholder="请填写用户账号"
            :rules="[{ required: true, message: '请填写用户账号' }]"
          />
          <van-field
            v-model="formData.remark"
            rows="2"
            autosize
            label="备注"
            type="textarea"
            maxlength="35"
            placeholder="请填写备注"
            show-word-limit
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
