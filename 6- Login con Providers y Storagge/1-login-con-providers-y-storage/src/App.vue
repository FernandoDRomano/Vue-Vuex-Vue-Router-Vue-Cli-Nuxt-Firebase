<template>
  <v-app>
    <Navbar></Navbar>       
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
};
</script>
