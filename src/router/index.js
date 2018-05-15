import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Business from '@/components/business/business'
import Mine from '@/components/mine/mine'
import Search from '@/components/search/search'
import mineDetail from '@/components/mine-detail/mine-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/business',
      name: 'business',
      component: Business,
      children: [{
        path: ':id',
        component: mineDetail
      }]
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
