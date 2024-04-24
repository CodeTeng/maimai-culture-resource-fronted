import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
import { showToast } from 'vant'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 插件配置，颜色修改
NProgress.configure({
  showSpinner: false
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: () => import('@/views/Register/index.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/findPwd',
      component: () => import('@/views/FindPwd/index.vue'),
      meta: { title: '找回密码' }
    },
    {
      path: '/',
      component: () => import('@/layouts/BasicLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '红色资源' }
        },
        {
          path: '/friend',
          component: () => import('@/views/Friend/index.vue'),
          meta: { title: '好友' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/system',
      component: () => import('@/views/System/index.vue'),
      meta: { title: '系统设置' }
    },
    {
      path: '/user/updatePwd',
      component: () => import('@/views/User/UpdatePwdPage.vue'),
      meta: { title: '修改密码' }
    },
    {
      path: '/user/userInfo',
      component: () => import('@/views/User/MyUserInfoPage.vue'),
      meta: { title: '个人信息' }
    },
    {
      path: '/userInfo/:id',
      component: () => import('@/views/User/UserInfoPage.vue'),
      meta: { title: '人员信息' }
    },
    {
      path: '/articleInfo/:id',
      component: () => import('@/views/Article/components/ArticleInfo.vue'),
      meta: { title: '文章详情' }
    },
    {
      path: '/user/myFollow',
      component: () => import('@/views/Follow/MyFollowPage.vue'),
      meta: { title: '我的关注' }
    },
    {
      path: '/user/myFav',
      component: () => import('@/views/Article/components/MyArticlePage.vue'),
      meta: { title: '我的收藏' }
    },
    {
      path: '/user/followMy',
      component: () => import('@/views/Follow/FollowMyPage.vue'),
      meta: { title: '粉丝' }
    },
    {
      path: '/friend/add',
      component: () => import('@/views/Friend/FriendAddPage.vue'),
      meta: { title: '添加好友' }
    },
    {
      path: '/user/comment',
      component: () => import('@/views/Reply/MyReplyPage.vue'),
      meta: { title: '我的评论' }
    },
    {
      path: '/select',
      component: () => import('@/views/Tag/index.vue'),
      meta: { title: '选择标签' }
    },
    {
      path: '/search',
      component: () => import('@/views/Search/index.vue'),
      meta: { title: '搜索' }
    },
    {
      path: '/demo',
      component: () => import('@/views/Reply/Demo.vue'),
      meta: { title: '评论demo' }
    }
  ]
})

// 前置守卫 访问权限控制
router.beforeEach((to) => {
  // 开启加载进度
  NProgress.start()
  const userStore = useUserStore()
  // 不需要登录的页面 白名单
  const whiteList = ['/login', '/register', '/findPwd']
  // 如果没有登录且不在白名单内，去登录
  if (!userStore.user?.id && !whiteList.includes(to.path)) {
    showToast('请先登录')
    return '/login'
  }
})

// 后置守卫
router.afterEach((to) => {
  // 修改页面标题
  document.title = `${to.meta.title || ''}-红色文化`
  // 加载完毕
  NProgress.done()
})

export default router
