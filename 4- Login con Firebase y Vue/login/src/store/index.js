import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
const firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {},
    error: ''
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload;
    },
    
    setError(state, error){
      state.error = error;
    }
  },
  actions: {
    registrarUsuario({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(respuesta => {
            const usuario = {
              email: respuesta.user.email,
              uid: respuesta.user.uid
            }

            commit('setUsuario', usuario)
            commit('setError', '')

            router.push({name: 'Home'})
        })
        .catch(error => {
          commit('setError', error.message)
        });
    },

    loginUsuario({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(respuesta => {
          const usuario = {
            email: respuesta.user.email,
            uid: respuesta.user.uid
          }

          commit('setUsuario', usuario)
          commit('setError', '')

          router.push({name: 'Home'})
        })
        .catch(error => {
          commit('setError', error.message)
        })
    },

    existeUsuarioLogueado({commit}){
      firebase.auth().onAuthStateChanged(user => {
        console.log(user)
        if (user) {
          
          const usuario = {
            email: user.email,
            uid: user.uid
          }

          commit('setUsuario', usuario)
          commit('setError', '')

        } 
      });
    },

    cerrarSesionUsuario({commit}){
      firebase.auth().signOut()
        .then( () => {
            commit('setUsuario', {})
            router.push({name: 'Login'})
        })
        .catch(error => console.error(error))
    }

  },

  getters:{
    visibilizarEnlace(state){
      return state.usuario.uid ? true : false
    }
  },
  
  modules: {
  }
})
