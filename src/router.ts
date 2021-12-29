import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Shuang from '@/views/ShuangPage.vue'
import Stat from '@/views/StatPage.vue'
import Help from '@/views/HelpPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Typings.dev',
    component: Shuang
  },
  {
    path: '/shuang',
    name: '双拼',
    component: Shuang
  },
  {
    path: '/help',
    name: '帮助',
    component: Help
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
