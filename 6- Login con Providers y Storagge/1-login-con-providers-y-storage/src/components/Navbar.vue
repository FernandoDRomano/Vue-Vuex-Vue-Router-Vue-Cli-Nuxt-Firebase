<template>
  <div>
    <v-app-bar app color="info" dark>

      <v-app-bar-nav-icon v-if="usuario.uid" @click="desplegarMenu = true"></v-app-bar-nav-icon>

      <router-link :to="{ name: 'Home' }" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-toolbar-title class="white--text"
            >Login con Providers y uso de Storage</v-toolbar-title
          >
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        @click="$router.push({ name: 'Login' }).catch((err) => {})"
        v-if="!usuario.uid"
      >
        Ingresar
        <v-icon right dark> fas fa-sign-in-alt </v-icon>
      </v-btn>

      <v-btn 
        color="deep-orange accent-2" 
        class="ma-2 white--text" 
        v-if="usuario.uid"
        @click="cerrarSesion"
        >
        Cerrar Sesión
        <v-icon right dark> fas fa-sign-out-alt </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="desplegarMenu" absolute temporary>
      <v-flex>
        <v-card class="d-flex flex-column justify-center align-content-center">
          <v-card-text class="text-center">
            <v-img
              class="mx-auto my-2 rounded-circle"
              height="65"
              width="65"
              :src="usuario.foto"
            ></v-img>
            <p class="mb-0">{{usuario.nombre}}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >

            <v-list-item  
              v-for="(item, $index) in menuLista" 
              :key="$index" 
              :to="{name: item.nameRuta}"
              exact>
              <v-list-item-icon>
                <v-icon>{{ item.icono }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.nombre }}</v-list-item-title>
            </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "Navbar",
  data() {
    return {
      desplegarMenu: false,
      group: null,
      menuLista: [
        { nombre: "Home", icono: "fas fa-home", nameRuta: "Home" },
        { nombre: "Perfil", icono: "fas fa-cogs", nameRuta: "Perfil" },
      ],
    };
  },
  computed: {
    ...mapState(['usuario'])
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  },
};
</script>