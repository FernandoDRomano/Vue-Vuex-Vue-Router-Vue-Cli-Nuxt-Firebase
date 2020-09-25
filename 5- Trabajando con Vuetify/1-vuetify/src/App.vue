<template>
  <v-app>
    <v-main>
      <v-container>
        <Feriados></Feriados>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Feriados from '@/components/Feriados.vue'
export default {
  name: 'App',

  components: {
    Feriados
  },

  data: () => ({
    //
  }),

};
</script>
