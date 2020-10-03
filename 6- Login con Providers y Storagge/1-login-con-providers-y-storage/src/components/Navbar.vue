<template>
  <v-app-bar app color="info" dark>
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
    >
      Ingresar
      <v-icon right dark> fas fa-sign-in-alt </v-icon>
    </v-btn>

    <v-btn color="deep-orange accent-2" class="ma-2 white--text">
      Cerrar Sesión
      <v-icon right dark> fas fa-sign-out-alt </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>