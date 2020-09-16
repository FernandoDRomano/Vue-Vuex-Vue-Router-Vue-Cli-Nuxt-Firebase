<template>
  <div id="app" class="container my-3">
    <div class="row">
      <div class="col-12">
        <Navegacion></Navegacion>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navegacion from '@/components/Navegacion.vue'

export default {
  name: 'App',
  components: {
    Navegacion
  }
}
</script>


<style lang="scss">

</style>
