import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/intelligent-quest/:id',
    name: 'intelligent-quest',
    component: () => import(/* webpackChunkName: "about" */ '../views/intelligent-quest.vue')
  },
  {
    path: '/high-risk-operation/:id',
    name: 'high-risk-operation',
    component: () => import(/* webpackChunkName: "about" */ '../views/high-risk-operation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
