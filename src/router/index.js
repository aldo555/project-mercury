import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue')
  },
  {
    path: '/play',
    name: 'Game',
    component: () => import(/* webpackChunkName: "about" */ '../views/Game.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
