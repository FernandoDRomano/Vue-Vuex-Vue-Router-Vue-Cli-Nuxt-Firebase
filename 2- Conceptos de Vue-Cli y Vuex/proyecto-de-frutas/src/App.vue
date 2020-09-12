<template>
  <div id="app" class="container mt-5">
    <Cabecera/>
    <FrutaAgregar/>
    <FrutaLista/>
  </div>
</template>

<script>

import Cabecera from '@/components/Cabecera.vue'
import FrutaLista from '@/components/FrutaLista.vue'
import FrutaAgregar from '@/components/FrutaAgregar.vue'

export default {
  name: 'App',
  components: { 
    Cabecera,
    FrutaLista,
    FrutaAgregar
  }
}
</script>

<style lang="scss">

</style>
