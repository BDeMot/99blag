import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/gags/:pathMatch(.*)',
    name: 'externalLink',
    component: () => import('../components/externalLink.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/gags/:id',
    name: 'Gag',
    component: () => import('../views/Gag.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
