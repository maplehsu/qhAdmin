import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Reserve from '@/view/reserve'
import Login from '@/view/login'
import Loop from '@/view/loop'
import Banner from '@/view/banner'
// 旅游攻略
import TourStrategy from "@/view/tourStrategy"
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: Reserve
    },
    {
      path: '/banner',
      name: 'banner',
      component: Banner
    },
    {
      path: '/loop',
      name: 'loop',
      component: Loop
    },
    {
      path: '/strategy',
      name: 'tourStrategy',
      component: TourStrategy
    }
  ]
})

export default router