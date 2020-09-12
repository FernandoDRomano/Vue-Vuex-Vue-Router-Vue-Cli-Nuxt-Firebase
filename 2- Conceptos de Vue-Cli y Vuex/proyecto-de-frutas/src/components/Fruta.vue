<template>
        <li @click="incrementarCantidad(fruta.id)" class="list-group-item d-flex justify-content-between align-items-center">
            {{fruta.nombre}}
            <span class="badge badge-primary badge-pill">{{fruta.cantidad}}</span>
        </li>
</template>

<script>
    export default {
        name: 'Fruta',
        props: ['fruta'],
        methods:{
            incrementarCantidad(id){
                this.$store.dispatch('incrementarCantidad', id)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>