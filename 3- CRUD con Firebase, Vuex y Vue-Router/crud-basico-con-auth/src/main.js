import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* CONFIGURACIÓN DE VUELIDATE */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/* CONFIGURACIÓN DE BOOSTRAP-VUE */
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

/* CONFIGURACIÓN DE FIREBASE */
const firebase = require('firebase/app')

require("firebase/auth");
require("firebase/firestore");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9knXu9Dt2bjpxgNg6S_mSGKaDQuydl5A",
  authDomain: "crud-con-auth-vue-ecosistema.firebaseapp.com",
  databaseURL: "https://crud-con-auth-vue-ecosistema.firebaseio.com",
  projectId: "crud-con-auth-vue-ecosistema",
  storageBucket: "crud-con-auth-vue-ecosistema.appspot.com",
  messagingSenderId: "875890058325",
  appId: "1:875890058325:web:4bab1544f83671418320dc",
  measurementId: "G-4VXJ6R5JM4"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

//store.dispatch('existeUsuarioLogueado')

console.log(firebase)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    console.log(user)

    const usuario = {
      email: user.email,
      uid: user.uid
    }

    store.dispatch('existeUsuarioLogueado', usuario)

  } else {
    // No user is signed in.
    console.log("no existe")
    
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

});


