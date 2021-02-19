import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bestiary from "@/views/Bestiary";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/bestiary',
    name: 'Bestiary',
    component: Bestiary
  },
  {
    path: '/spells',
    name: 'Spells',
    component: () => import(/* webpackChunkName: "about" */ '../views/Spells')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "about" */ '../views/Items')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
