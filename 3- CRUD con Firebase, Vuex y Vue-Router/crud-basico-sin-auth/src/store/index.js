import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../firebase.js'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: {}
  },
  mutations: {
    setTareas(state, tareas){
      state.tareas = tareas;
    },

    setTarea(state, tarea){
      state.tarea = tarea;
    }
  },
  actions: {
    //OBTENGO TODAS LAS TAREAS DE LA BD DE FIREBASE
    getTareas({commit}){
      let tareas = [];
      db.collection('tareas').get()
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
    getTarea({commit}, id){
      db.collection('tareas').doc(id).get()
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
    updateTarea({}, tarea){
      console.log(tarea)
      db.collection('tareas').doc(tarea.id).update({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion
      })
        .then( () => {
          router.push({name: 'Home'})
        })
    }
  },
  modules: {
  }
})
