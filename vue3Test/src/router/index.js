import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/system',
    name: 'system',
    component: ()=>import("@/views/system/index.vue")
  },
  {
    path: '/testing',
    name: 'testing',
    component: ()=>import("@/views/testing/index.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
