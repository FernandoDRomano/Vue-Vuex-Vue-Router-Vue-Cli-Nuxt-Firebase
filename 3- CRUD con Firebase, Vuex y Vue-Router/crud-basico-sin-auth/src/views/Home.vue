<template>
  <div class="home">
      <TareasLista/>
  </div>
</template>

<script>
// @ is an alias to /src
import TareasLista from '@/components/TareasLista.vue'

import {mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {
    TareasLista, 
  },
  methods: {
    ...mapActions(['getTareas'])
  },
  created(){
    this.getTareas()
  }
}
</script>
