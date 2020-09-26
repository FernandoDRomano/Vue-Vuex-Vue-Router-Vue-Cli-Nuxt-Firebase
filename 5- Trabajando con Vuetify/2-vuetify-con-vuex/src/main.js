import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import VueTextareaAutosize from "vue-textarea-autosize";
Vue.use(VueTextareaAutosize);

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


/* CONFIGURACIÓN DE FIREBASE */
const firebase = require('firebase/app')
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBV65A-1Utc5bks42eVVNll2q5UHnLU2QE",
  authDomain: "calendario-con-vuex.firebaseapp.com",
  databaseURL: "https://calendario-con-vuex.firebaseio.com",
  projectId: "calendario-con-vuex",
  storageBucket: "calendario-con-vuex.appspot.com",
  messagingSenderId: "65362456892",
  appId: "1:65362456892:web:5d25b6b53363126187ee39"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
