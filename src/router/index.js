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
  },
  {
    path: '/high-risk-operation-group/:id',
    name: 'high-risk-operation-group',
    component: () => import(/* webpackChunkName: "about" */ '../views/high-risk-operation-group.vue')
  },
  {
    path: '/trouble-emergency-treatment',
    name: 'trouble-emergency-treatment',
    component: () => import(/* webpackChunkName: "about" */ '../views/trouble-emergency-treatment.vue'),
    // children:[{
    //   path: '/trouble-emergency-treatment-detail/:id',
    //   name: 'trouble-emergency-treatment-detail',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/trouble-emergency-treatment-detail.vue')
    // }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
