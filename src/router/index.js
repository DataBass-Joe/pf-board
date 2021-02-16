import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bestiary from "@/views/Bestiary";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'sheet',
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Spells.vue')
  },
  {
    path: '/sheet',
    name: 'Sheet',

    component: () => import(/* webpackChunkName: "about" */ '../views/Sheet.vue')
  },
  {
    path: '/immogen',
    name: 'Immogen',

    component: () => import(/* webpackChunkName: "about" */ '../views/Immogen.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
