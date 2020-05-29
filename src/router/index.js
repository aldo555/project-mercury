import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: () => import(/* webpackChunkName: "splash" */ '../views/Splash.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next(false)
      } else {
        next()
      }
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next({ name: 'Splash' })
      }
    }
  },
  {
    path: '/play/',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name === 'Menu' || from.name === 'Results') {
        next()
      } else {
        next({ name: 'Menu' })
      }
    }
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      if (from.name !== 'Game') {
        next({ name: 'Menu' })
      } else {
        next()
      }
    }
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "results" */ '../views/Stats.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next({ name: 'Splash' })
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
