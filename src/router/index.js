import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue')
  },
  {
    path: '/play',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue'),
    props: true
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
