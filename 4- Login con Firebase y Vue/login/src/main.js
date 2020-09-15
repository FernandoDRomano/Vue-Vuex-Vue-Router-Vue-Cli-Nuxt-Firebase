import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const firebase = require('firebase/app')

require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBix_LR3OefLqW2qFNlZgjyNknUlsPHndw",
  authDomain: "login-con-firebase-y-vue.firebaseapp.com",
  databaseURL: "https://login-con-firebase-y-vue.firebaseio.com",
  projectId: "login-con-firebase-y-vue",
  storageBucket: "login-con-firebase-y-vue.appspot.com",
  messagingSenderId: "490326652467",
  appId: "1:490326652467:web:30494bcae461db54369546",
  measurementId: "G-N3B60XXRRV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

store.dispatch('existeUsuarioLogueado')

console.log(firebase)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
