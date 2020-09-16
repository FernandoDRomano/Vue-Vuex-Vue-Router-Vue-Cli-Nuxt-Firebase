<template>
    <div id="nav" class="text-center">
        <router-link v-if="visibilizarEnlace"  :to="{name: 'Home'}"> Home |</router-link>
        <a v-if="visibilizarEnlace" @click.prevent="cerrarSesionUsuario" href="#" class="text-danger font-weight-bold"> Cerrar Sesión |</a>
        <router-link v-if="!visibilizarEnlace" :to="{name: 'Login'}"> Login |</router-link>
        <router-link v-if="!visibilizarEnlace" :to="{name: 'Registro'}"> Registro |</router-link>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: 'Navegacion',
        computed:{
          ...mapGetters(['visibilizarEnlace'])
        },
        methods:{
          ...mapActions(['cerrarSesionUsuario'])
        }
    }
</script>

<style lang="scss" scoped>

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>