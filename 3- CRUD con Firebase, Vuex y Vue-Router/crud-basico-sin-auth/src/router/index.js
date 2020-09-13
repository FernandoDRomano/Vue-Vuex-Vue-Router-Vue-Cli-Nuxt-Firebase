import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => /* webpackChunkName: 'Editar' */ import('../views/EditarTarea.vue')
  },
  {
    path: '/view/:id',
    name: 'View',
    component: () => /* webpackChunkName: 'Editar' */ import('../views/ViewTarea.vue')
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: () => /* webpackChunkName: 'Agregar' */ import('../views/AgregarTarea.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
