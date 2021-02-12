import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'sheet',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/bestiary',
    name: 'Bestiary',
    component: () => import(/* webpackChunkName: "about" */ '../components/Bestiary.vue')
  },
  {
    path: '/sheet',
    name: 'Sheet',

    component: () => import(/* webpackChunkName: "about" */ '../views/Sheet.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
