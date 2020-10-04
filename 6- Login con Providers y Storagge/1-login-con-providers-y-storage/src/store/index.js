import Vue from "vue";
import Vuex from "vuex";
import { firebase, auth, db, storage } from "@/firebase.js";
import router from "@/router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {
      nombre: '',
      foto: '',
      email: '',
      uid: ''
    }
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setFotoPerfil(state, payload) {
      state.usuario.foto = payload;
    },
    setUid(state, payload) {
      state.usuario.uid = payload;
    },
  },
  actions: {
    
    async ingresarUsuario({ dispatch, commit }, payload) {

      try {
        let provider = null;

        payload === 'google' 
          ? provider = new firebase.auth.GoogleAuthProvider() 
          : provider = new firebase.auth.FacebookAuthProvider()

        const resultado = await auth.signInWithPopup(provider)
          // The signed-in user info.
        const user = resultado.user;

        commit('setUid', user.uid)

        await dispatch('getUsuarioBD', user)

        router.push({ name: "Home" });


      } catch (error) {
          console.log(error)
      }
      
    },

    async getUsuarioBD({ commit }, payload) {
      try {
        const respuesta = await db.collection("usuarios").doc(payload.uid).get()
          
        if (respuesta.exists) {
            commit("setUsuario", respuesta.data());
        } else {
          const usuario = {
              nombre: payload.displayName,
              email: payload.email,
              uid: payload.uid,
              foto: payload.photoURL,
          };

          db.collection('usuarios').doc(usuario.uid).set(usuario)
            .then( () => {
              commit("setUsuario", usuario);
            })
        }

      } catch (error) {
        console.error(error)
      }
    },

    cerrarSesion({ commit }) {
      auth
        .signOut()
        .then(() => {
          const usuario = {
            nombre: '',
            foto: '',
            email: '',
            uid: ''
          }
          commit("setUsuario", usuario);
          router.push({ name: "Login" });
        })
        .catch((error) => console.error(error));
    },

    async subirImagen({ state, commit }, payload) {
      try {
        const referenciaImagen = storage.ref().child(state.usuario.email).child("foto de perfil");

        await referenciaImagen.put(payload)
        const urlImagen = await referenciaImagen.getDownloadURL()
               
        await db.collection("usuarios").doc(state.usuario.uid).update({
              foto: urlImagen,
            });

        commit("setFotoPerfil", urlImagen);                  
      } catch (error) {
        console.error(error);
      }

    },
  },
  modules: {},
});
