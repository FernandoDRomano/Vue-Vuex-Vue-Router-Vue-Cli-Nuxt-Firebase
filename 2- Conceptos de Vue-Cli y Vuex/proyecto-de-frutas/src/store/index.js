import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frutas: [
      {nombre: 'Manzana', cantidad: 4, id:1},
      {nombre: 'Mandarina', cantidad: 6, id:2},
      {nombre: 'Banana', cantidad: 2, id:3}
    ]
  },
  mutations: {
    agregarFruta(state, fruta){
      state.frutas.push(fruta)
    },

    incrementarCantidad(state, indice){
      state.frutas[indice].cantidad++;
    },

    reiniciarCantidad(state){
      state.frutas.forEach( fruta => fruta.cantidad = 0)
    }
  },
  actions: {

    agregarFruta({state, commit, getters}, nombreFruta){
      const fruta = {
        nombre: nombreFruta,
        cantidad: 0,
       /*  id: state.frutas.length > 0 ? (state.frutas[state.frutas.length - 1].id + 1) : 0, */
       id: state.frutas.length > 0 ? (getters.frutasOrdenadasPorId[state.frutas.length-1].id + 1) : 0,
      }

      commit('agregarFruta', fruta)
    },

    incrementarCantidad({state, commit}, id){
      const indice = state.frutas.findIndex(fruta => fruta.id === id);
      commit('incrementarCantidad', indice);
    }

  },
  getters:{
    frutasOrdenadasPorCantidad(state){
      return state.frutas.sort((a,b) => b.cantidad - a.cantidad)
    },
    frutasOrdenadasPorId(state){
      return state.frutas.sort((a,b) => a.id - b.id) 
    }
  },
  modules: {
  }
})
