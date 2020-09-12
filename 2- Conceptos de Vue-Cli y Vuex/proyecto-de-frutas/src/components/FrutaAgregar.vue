<template>
    <form 
        @submit.prevent="agregarFruta" 
        class="my-2">

        <div class="form-inline">
          <input  v-model="nombre" type="text" class="form-control px-5 mr-1" placeholder="Nombre de la fruta" required>
          <input type="submit" class="btn btn-primary" value="Agregar">
        </div>
    </form>
</template>

<script>

    export default {
        name: 'FrutaAgregar',
        data(){
            return {
                nombre: ''
            }
        },
        methods:{
            agregarFruta(){
                this.$store.dispatch('agregarFruta', this.nombre);
                this.nombre = ''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>