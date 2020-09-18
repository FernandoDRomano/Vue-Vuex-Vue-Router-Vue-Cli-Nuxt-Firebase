import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import {db} from '../main'
const firebase = require('firebase/app')


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {},
    error: '',
    tareas: [],
    tarea: {},
    buscarTarea: ''
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload;
    },
    
    setError(state, payload){
      state.error = payload;
    },
     
    setTareas(state, payload){
      state.tareas = payload;
    },

    setTarea(state, payload){
      state.tarea = payload;
    },

    setBusqueda(state, payload){
      state.buscarTarea = payload
    },

    getTareas(state, id){
      state.tareas = state.tareas.filter(tarea => tarea.id != id)
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
          if(error.code === 'auth/email-already-in-use'){
            const mensaje = "Error: este Email ya se encuentra en uso"
            commit('setError', mensaje) 
          }
        });
    },

    /* crearColeccionParaElUsuario(context, payload){
      db.collection(payload.email)
    }, */

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

    existeUsuarioLogueado({commit}, payload){

          commit('setUsuario', payload)
          commit('setError', '')
    },

    cerrarSesionUsuario({commit}){
      firebase.auth().signOut()
        .then( () => {
            commit('setUsuario', {})
            router.push({name: 'Login'})
        })
        .catch(error => console.error(error))
    },

    //OBTENGO TODAS LAS TAREAS DE LA BD DE FIREBASE
    getTareas({commit, state}){
      let tareas = [];
      console.log("getTareas dice: "+ state.usuario.email)
      //var user = firebase.auth().currentUser;

      db.collection(state.usuario.email).get()
        .then(datos => {

            datos.forEach(elemento => {
              const tarea = {
                id: elemento.id,
                nombre: elemento.data().nombre,
                descripcion: elemento.data().descripcion
              }
  
              tareas.push(tarea);
            });
  
            commit('setTareas', tareas)
          
        })
        .catch(error => console.error(error))
    },

    //OBTENGO UNA TAREA ESPECIFICA
    getTarea({commit, state}, id){
      db.collection(state.usuario.email).doc(id).get()
        .then(dato => {
            const tarea = {
              id: dato.id,
              nombre: dato.data().nombre,
              descripcion: dato.data().descripcion
            }

            commit('setTarea', tarea)
        })
    },

    //ACTUALIZAR TAREA
    updateTarea({state}, tarea){
      db.collection(state.usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion
      })
        .then( () => {
          router.push({name: 'Home'})
        })
        .catch(error => console.error(error))
    },

    //AGREGAR TAREA
    agregarTarea({state}, tarea){
      db.collection(state.usuario.email).add({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion
      })
      .then( data => {
        //VALIDO QUE SE HAYA CREADO EL NUEVO DOCUMENTO
        if(data.id){
          //REDIRECCIONO A LA HOME
          router.push({name: 'Home'})
        }
      })
      .catch(error => console.error(error))
    },

    //ELIMINAR TAREA
    eliminarTarea({commit, state}, id){
      db.collection(state.usuario.email).doc(id).delete()
        .then( () => {
            console.log("Tarea eliminada ...")
            /* 
              PODRIA HACER UNA CONSULTA A LA BD PARA OBTENER TODAS LAS TAREAS UNA VEZ ELIMINADA LA TAREA
              dispatch('getTareas')
            */

            //O CREAR UNA MUTACIÓN PARA FILTRAR EN MEMORIA LA TAREA ELIMINADA
            commit('getTareas', id)
        })
        .catch(error => console.error(error))
    }

  },

  getters:{
    visibilizarEnlace(state){
      return state.usuario.uid ? true : false
    },

    tareasFitradas(state){
      return state.tareas.filter(tarea => tarea.nombre.includes(state.buscarTarea))
    }
  },
  

})