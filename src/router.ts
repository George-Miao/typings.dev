import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Shuang from '@/views/ShuangPage.vue'
import Stat from '@/views/StatPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Shuang
  },
  {
    path: '/shuang',
    name: 'Shuang',
    component: Shuang
  },
  {
    path: '/stat',
    name: 'Stat',
    component: Stat
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
