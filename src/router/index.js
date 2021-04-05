import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Search')
  },
  {
    path: '/charlotte',
    name: 'Charlotte',

    component: () => import(/* webpackChunkName: "about" */ '@/views/Charlotte')
  },
  {
    path: '/immogen',
    name: 'Immogen',

    component: () => import(/* webpackChunkName: "about" */ '@/views/Immogen')
  },
  {
    path: '/john',
    name: 'John',

    component: () => import(/* webpackChunkName: "about" */ '@/views/John')
  }
]

const router = new VueRouter({
  routes
})

export default router
