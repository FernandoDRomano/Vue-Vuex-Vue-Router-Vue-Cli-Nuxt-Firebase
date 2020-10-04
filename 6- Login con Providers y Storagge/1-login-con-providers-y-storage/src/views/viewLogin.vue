<template>
  <v-row class="justify-center mt-5">
    <v-col cols="8" md="6" lg="5">
      <v-card>

       <v-card-text v-if="login" class="accent white--text">
            <h1 class="text-center">Ingresar</h1>
       </v-card-text>

        <v-card-text v-if="!login" class="secondary white--text">
            <h1 class="text-center">Registrate</h1>
       </v-card-text>

        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-btn class=" red darken-2" dark :block="true" rounded @click="ingresarUsuario('google')">
                Google
                <v-icon right dark :small="true"> fab fa-google </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn class="" color="info" :block="true" rounded @click="ingresarUsuario('facebook')">
                Facebook
                <v-icon right dark :small="true"> fab fa-facebook-f </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text v-if="login" class="pt-0">
            <p class="mb-0 text-center">
                No tienes una cuenta, registrate haciendo click 
                <a href="#" @click.prevent="login = !login">aquí</a>
            </p>
        </v-card-text>

        <v-card-text v-if="!login" class="pt-0">
            <p class="mb-0 text-center">
                Si tienes una cuenta, ingresa haciendo click 
                <a href="#" @click.prevent="login = !login">aquí</a>
            </p>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: "viewLogin",
  data() {
      return {
          login: true
      }
  },
  methods: {
    ...mapActions(['ingresarUsuario']),
  },
};
</script>