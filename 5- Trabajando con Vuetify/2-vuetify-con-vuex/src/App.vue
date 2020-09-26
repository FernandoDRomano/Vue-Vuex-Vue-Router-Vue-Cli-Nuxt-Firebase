<template>
  <v-app>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12">
          <Calendario></Calendario>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import Calendario from '@/components/Calendario.vue'

export default {
  name: 'App',

  components: {
    Calendario
  },

  data: () => ({
    //
  }),
};
</script>
