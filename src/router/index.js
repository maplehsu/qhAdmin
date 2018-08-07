import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Reserve from '@/view/reserve'
import Login from '@/view/login'
import Banner from '@/view/banner'

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
    }
  ]
})

export default router
