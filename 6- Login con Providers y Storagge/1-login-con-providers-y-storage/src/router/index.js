import Vue from 'vue'
import VueRouter from 'vue-router' 
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/viewDashboard.vue'),
    meta: { requiereAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/viewLogin.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "login" */ '@/views/viewPerfil.vue'),
    meta: { requiereAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* PARA DAR PROTECCIÓN DE MANERA GLOBAL A LAS RUTAS */
router.beforeEach((to, from, next) => {
  /*  
    VERIFICO SI LA RUTA HACIA DONDE ME DIRIJO TIENE LA META DE requiereAuth, 
    ESTA LA DEFINI PARA INDICAR QUE ESTA RUTA NECESITA DE ESTAR AUTENTIFICADO 
  */
  if (to.matched.some(record => record.meta.requiereAuth)) {
    /* SI LA RUTA NECESITA AUTENTIFICACION, ME FIJO EN LA STORE SI EL USUARIO ESTA AUTENTIFICADO */
    if (store.state.usuario.uid) {
      /* SI EL USUARIO ESTA AUTENTIFICADO LE DOY PERMISO PARA QUE SIGA PARA ADELANTE */
      next();
    } else {
      /* SI EL USUARIO NO ESTA AUTENTIFICADO, NO LE DOY PERMISO DE ACCEDER A LA RUTA Y LO REDIFIJO AL LOGIN */
      next({ name: "Login" });
    }
  /* 
    EN EL CASO DE QUE LA RUTA NO REQUIERE AUTENTIFICACION, ES DECIR QUE LA META DE requiereAuth NO 
    SE ENCUENTRE COMO REQUISITO EN LA RUTA, LO DEJO PASAR DIRECTAMENTE A LA RUTA QUE SE DIRIJE
  */
  } else {
    next();
  }
});

export default router
