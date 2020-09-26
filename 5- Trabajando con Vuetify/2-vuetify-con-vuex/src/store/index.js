import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    eventos: [],
    evento: null,
    cargandoDatos: false

  },
  mutations: {

    setEventos(state, payload){
      state.eventos = payload
    },

    setEvento(state, payload){
      state.evento = payload
    },

    setCargandoDatos(state, payload){
      state.cargandoDatos = payload
    }

  },
  actions: {
    getEventos({commit}){
      let eventos = []  
      
      commit('setCargandoDatos', true)

      db.collection('eventos').get()
        .then(data => {
          data.forEach(elemento => {
            const evento = {
              id: elemento.id,
              name: elemento.data().name,
              details: elemento.data().details,
              start: elemento.data().start,
              end: elemento.data().end,
              color: elemento.data().color
            }
            
            eventos.push(evento)

          })

          commit('setEventos', eventos)
          commit('setCargandoDatos', false)

        })
        .catch(error => console.error(error))
    },

    addEvento({dispatch, commit}, payload){
      commit('setCargandoDatos', true)
      db.collection('eventos').add(payload)
        .then(()=>{
          console.log("Se agrego el evento a la bd")
          dispatch('getEventos')
        })
        .catch(error => console.error(error))
    },

    deleteEvento({dispatch, commit}, id){
      commit('setCargandoDatos', true)
      db.collection('eventos').doc(id).delete()
        .then( () => {
           console.log("Se elimino el evento de la bd")
           dispatch('getEventos')
        })
        .catch(error => console.error(error))
    },

    updateEvento({dispatch, commit}, payload){
      commit('setCargandoDatos', true)
      db.collection('eventos').doc(payload.id).update({
        name: payload.name,
        details: payload.details
      })
        .then( () => {
          console.log("Se actualizo el evento en la bd")
           dispatch('getEventos')
        })
        .catch(error => console.error(error))
    }

  },
  modules: {
  }
})
