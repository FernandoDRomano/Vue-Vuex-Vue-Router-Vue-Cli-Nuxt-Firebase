import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../firebase.js'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: {},
    buscarTarea: ''
  },
  mutations: {
    setTareas(state, tareas){
      state.tareas = tareas;
    },

    setTarea(state, tarea){
      state.tarea = tarea;
    },

    setBusqueda(state, buscar){
      state.buscarTarea = buscar
    },

    getTareas(state, id){
      state.tareas = state.tareas.filter(tarea => tarea.id != id)
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
    updateTarea(context, tarea){
      db.collection('tareas').doc(tarea.id).update({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion
      })
        .then( () => {
          router.push({name: 'Home'})
        })
        .catch(error => console.error(error))
    },

    //AGREGAR TAREA
    agregarTarea(context, tarea){
      db.collection('tareas').add({
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
    eliminarTarea({commit}, id){
      db.collection('tareas').doc(id).delete()
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
    tareasFitradas(state){
      return state.tareas.filter(tarea => tarea.nombre.includes(state.buscarTarea))
    }
  },
  modules: {
  }
})
