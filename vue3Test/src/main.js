import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'

import '@/style/index.scss'

createApp(App).use(store).use(router).use(naive).mount('#app')
