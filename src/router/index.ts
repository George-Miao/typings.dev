import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Shuang from '../views/Shuang.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Shuang,
  },
  {
    path: '/shuang',
    name: 'Shuang',
    component: Shuang,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
