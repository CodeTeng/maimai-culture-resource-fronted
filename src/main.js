import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import 'virtual:svg-icons-register'
// 样式全局使用
import 'vant/lib/index.css'
import './styles/main.scss'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
