<template>
  <div class="commentListCpn">
    <!-- 练习 小项目 题目 -->
    <h1>CommentList</h1>
    <hr />

    <!--  -->
    <div class="commentListCont">
      <!-- 一级评论 输入 -->
      <div class="levelOneCommentInput commentInput">
        <div class="userPhoto">
          <img src="https://c2.im5i.com/2022/09/14/50cQ1.jpg" alt="" />
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="文本中的评论将被发送"
            v-model.lazy.trim="levelOneCommentContent"
          />
          <button @click="handlerlevelOneComment()">评论</button>
        </div>
      </div>

      <!-- 评论渲染 -->
      <div class="commentList">
        <!-- 评论item -->
        <div
          class="commentItemCont"
          v-for="item in renderData"
          :key="item.parent.id"
        >
          <!-- ！！！！一级评论 -->
          <div class="levelOneComment commentItem">
            <!-- 头像 -->
            <div class="userPhoto">
              <img src="https://c2.im5i.com/2022/09/14/50syn.jpg" alt="" />
            </div>
            <!-- 评论内容 -->
            <div class="userComment">
              <p class="userName">{{ item.parent.nick_name }}</p>
              <p class="content">{{ item.parent.content }}</p>
              <p class="operationBar">
                <span class="commentDate">{{ item.parent.time }}</span>
                <span class="commentBtn" @click="showChild(item.itemId)"
                >回复</span
                >
              </p>
            </div>
          </div>

          <!-- ！！！！！二级评论 -->
          <!-- item.isShowChild -->
          <div
            class="levelTwoComment"
            :class="{ levelTwoCommentShow: item.isShowChild }"
          >
            <div class="levelOneCommentInput commentInput">
              <div class="input">
                <input
                  type="text"
                  placeholder="文本中的评论将被发送"
                  v-model.lazy.trim="levelTwoCommentContent"
                />
                <button @click="handlerlevelTwoComment(item.parent.id)">
                  评论
                </button>
              </div>
            </div>
            <div
              class="commentItem"
              v-for="subitem in item.child"
              :key="subitem.id"
            >
              <div class="userPhoto">
                <!-- https://c2.im5i.com/2022/09/14/50cQ1.jpg
                      https://c2.im5i.com/2022/09/14/50syn.jpg
                 -->
                <img src="https://c2.im5i.com/2022/09/14/50hjy.jpg" alt="" />
              </div>
              <div class="userComment">
                <p class="userName">{{ subitem.nick_name }}</p>
                <p class="content">{{ subitem.content }}</p>
                <p class="operationBar">
                  <span class="commentDate">{{ subitem.time }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- 分割线 -->
          <div class="isShowLine"></div>
        </div>
        <div class="endTip">没有更多数据了</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入
import { onUpdated, ref, reactive, watch } from 'vue'

// 申明 响应式数据 ====================
let originCommentListData = reactive({
  data: [
    {
      id: 1,
      nick_name: '冬天的雨',
      content: '非常好的文章！',
      parent_id: 0,
      time: 1625454585,
      boolChild: false
    },
    {
      id: 2,
      nick_name: '半栈java',
      content: '底层实现有点看蒙圈了。java和c代码都有。c是class还差不多！',
      parent_id: 0,
      time: 1625368185,
      boolChild: false
    },
    {
      id: 3,
      nick_name: '用户891368888118',
      content: '挺多干货的！',
      parent_id: 0,
      time: 1625364585,
      boolChild: false
    },
    {
      id: 4,
      nick_name: '初级前端选手',
      content: '收藏了！！',
      parent_id: 0,
      time: 1622772585,
      boolChild: false
    },
    {
      id: 5,
      nick_name: '用户2784289850703',
      content: '非常好的文章！',
      parent_id: 0,
      time: 1622754585,
      boolChild: false
    },
    {
      id: 6,
      nick_name: '谢谢分享！',
      content: '一直看大佬的文章，真不错！',
      parent_id: 0,
      time: 1623186585,
      boolChild: false
    },
    {
      id: 7,
      nick_name: '真不错！',
      content: '优秀呀！',
      parent_id: 0,
      time: 1623222585,
      boolChild: false
    },
    {
      id: 8,
      nick_name: '又傻又笨的二狗',
      content: '加油，加油！',
      parent_id: 5,
      time: 1623225345,
      boolChild: false
    },
    {
      id: 9,
      nick_name: '昨天不再是昨天',
      content: '希望大佬多分享文章！ ',
      parent_id: 5,
      time: 1625039745,
      boolChild: false
    },
    {
      id: 10,
      nick_name: '用户8128696273319',
      content: '比较详细，谢谢！',
      parent_id: 5,
      time: 1624002945,
      boolChild: false
    },
    {
      id: 11,
      nick_name: '用户458666108980',
      content: '太强了！',
      parent_id: 5,
      time: 1625454701,
      boolChild: false
    },
    {
      id: 12,
      nick_name: '用户3009977972039',
      content: '感谢分享！',
      parent_id: 5,
      time: 1625454705,
      boolChild: false
    },
    {
      id: 13,
      nick_name: '用户1734135186928',
      content: '文章不错！',
      parent_id: 0,
      time: 1625454708,
      boolChild: false
    },
    {
      id: 14,
      nick_name: '用户8547655399924',
      content: 'nice',
      parent_id: 0,
      time: 1625454696,
      boolChild: false
    },
    {
      id: 15,
      nick_name: '用户2450039971636',
      content: '还不错',
      parent_id: 1,
      time: 1625195496,
      boolChild: false
    },
    {
      id: 16,
      nick_name: '用户9527',
      content: '收藏饿了',
      parent_id: 1,
      time: 1625454733,
      boolChild: false
    },
    {
      id: 17,
      nick_name: 'SAM9029',
      content: '🐼🐸🦓🐴',
      parent_id: 0,
      time: 1625454733,
      boolChild: false
    }
  ]
})

// 整合数据
let renderData = ref()

// 监听 并创建 新的渲染评论列表 数据
watch(() => originCommentListData.data, updateCommentData, {
  deep: true,
  immediate: true
})

// 更新整合函数数据
function updateCommentData() {
  // 深拷贝 消除 影响源数据
  let deepCloneOriginData = JSON.parse(
    JSON.stringify(originCommentListData.data)
  )

  // 筛出 一级评论
  let parentData = deepCloneOriginData.filter((item) => item.parent_id === 0)

  // 筛出 二级评论
  let childData = deepCloneOriginData.filter((item) => item.parent_id !== 0)

  // 时间 倒序排序处理
  parentData.sort((a, b) => b.time - a.time)
  childData.sort((a, b) => b.time - a.time)

  // 时间毫秒转换处理
  parentData.map((item) => {
    item.time = timeToggle(item.time)
  })
  childData.map((item) => {
    item.time = timeToggle(item.time)
  })

  let newRenderData = []

  for (let i = 0; i < parentData.length; i++) {
    newRenderData.push({
      itemId: parentData[i].id,
      parent: { ...parentData[i] },
      child: JSON.parse(
        JSON.stringify(
          childData.filter((item) => item.parent_id === parentData[i].id)
        )
      ),
      isShowChild: false
    })
  }
  renderData.value = JSON.parse(JSON.stringify(newRenderData))

  console.log(JSON.parse(JSON.stringify(renderData.value)))
  // 返回筛出数据
  return newRenderData
}

// 展开 二级控制
function showChild(_id) {
  renderData.value.map((item) => {
    if (item.itemId === _id) {
      // console.log(item.isShowChild)
      item.isShowChild = !item.isShowChild
      // console.log(item.isShowChild)
    }
  })
}

// 一级评论内容
let levelOneCommentContent = ref()
// 二级评论内容
let levelTwoCommentContent = ref()

function handlerlevelOneComment() {
  if (levelOneCommentContent.value) {
    // 时间处理
    let nowTime = new Date().getTime()

    // 增加 评论
    originCommentListData.data.push({
      id: originCommentListData.data.length + 1,
      nick_name: 'SAM9029',
      content: levelOneCommentContent.value,
      parent_id: 0,
      time: nowTime,
      boolChild: false
    })

    levelOneCommentContent.value = ''
    alert('评论成功！')
  } else {
    alert('请勿输入空值！')
  }
}
let levelTwoReControlId = ref()
function handlerlevelTwoComment(_parentId) {
  if (levelTwoCommentContent.value) {
    // 时间处理
    let nowTime = new Date().getTime()

    // 增加 评论
    originCommentListData.data.push({
      id: originCommentListData.data.length + 1,
      nick_name: 'SAM9029',
      content: levelTwoCommentContent.value,
      parent_id: _parentId,
      time: nowTime,
      boolChild: false
    })

    levelTwoReControlId.value = _parentId
    levelTwoCommentContent.value = ''
    alert('评论成功！')
  } else {
    alert('请勿输入空值！')
  }
}

// 二级评论新增时，再次渲染要重新对应的二级评论展开
onUpdated(() => {
  console.log('updateCommentData')

  for (let i = 0, len = renderData.value.length; i < len; i++) {
    if (renderData.value[i].itemId === levelTwoReControlId.value) {
      renderData.value[i].isShowChild = true
      levelTwoReControlId.value = ''
      // 节约性能
      return
    }
  }
})

// 时间戳 转换 处理
function timeToggle(_time) {
  let commentDate = new Date(_time)
  let year = commentDate.getFullYear()
  let month = commentDate.getMonth() + 1
  let date = commentDate.getDate()
  let commentClock = commentDate.toString().split(' ')[4]

  return `${year}/${month}/${date} ${commentClock}`
}
</script>

<style>
.commentListCpn {
  padding: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h1 {
  font-size: 25px;
  font-weight: bolder;
}

hr {
  border-top: 1px solid #eee;
  width: 100%;
}

.commentListCont {
  /*border: 1px solid #eee;*/
  margin: 10px auto;
  width: 80%;
  /*temp height*/
  /*height: 600px;*/

  min-width: 650px;
  box-shadow: 1px 1px 5px 5px #999;

  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 头像 */
.userPhoto {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 15px;
}

.userPhoto img {
  width: 100%;
  height: 100%;
}

/*一级,二级,评论输入*/
.commentInput {
  width: 100%;
  padding: 15px;
  background-color: #dedfe0;
  height: 60px;
  display: flex;
  /*justify-content: ;*/
  align-items: center;
}

.commentInput .input {
  flex: 1;
  position: relative;
}

.commentInput .input > input {
  width: 100%;
  display: block;
  box-sizing: border-box;
  height: 30px;
  border: 1px solid black;
  border-right: none;
  border-radius: 20px;
  outline: none;
  padding: 0 30px 0 10px;
  color: #666;
}

.commentInput .input > button {
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 20px;
  height: 30px;
  padding: 0 15px;
  border: none;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px 5px #999;
}

.commentInput .input > button:active {
  box-shadow: 1px 1px 5px 5px #999 inset;
}

/* 评论列表 */
.commentList {
  flex: 1;
  width: 100%;
  padding: 0 5px;
  overflow: auto;
}

/*一级评论*/
.levelOneComment {
  /*border: 1px solid tomato; */
}

/*二级评论*/
.levelTwoComment {
  display: none;
  /*border: 1px solid skyblue; */
  padding: 0 0 0 80px;
}

/*二级评论展示控制*/
.levelTwoCommentShow {
  display: block;
}

/*评论item*/
.commentItem {
  width: 100%;
  height: 100px;
  padding: 10px 15px;
  color: #666 !important;

  display: flex;
  justify-content: space-between;
}

.isShowLine {
  border-bottom: 1px solid #aaa;
}

.commentItem .userComment {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.commentItem .userComment .userName {
  font-weight: bolder;
}

.commentItem .userComment .content {
  flex: 1;
  display: flex;
  align-items: center;
}

.commentItem .userComment .operationBar {
  display: inline-flex;
  justify-content: space-between;
  color: #999;
}
</style>
