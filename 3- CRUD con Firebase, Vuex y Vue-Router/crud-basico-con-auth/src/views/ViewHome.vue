<template>
    <div class="row">
        <div class="col-12">
            <h1 class="font-weight-bold text-center my-4">Bienvenido <span class="font-weight-bold text-primary">{{usuario.email}}</span></h1>
        </div>
        <div class="col-12">
            <TareasLista/>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import TareasLista from '@/components/TareasLista.vue'

    export default {
        name: 'ViewHome',
        computed: {
            ...mapState(['usuario'])
        },
        components: {
            TareasLista, 
        },
        methods: {
            ...mapActions(['getTareas'])
        },
        mounted(){
            this.getTareas()
        }
    }
</script>

<style lang="scss" scoped>

</style>