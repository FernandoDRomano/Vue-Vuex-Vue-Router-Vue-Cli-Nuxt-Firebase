<template>
    <div>
        <ul class="list-group">
            <Fruta 
                v-for="fruta in frutasOrdenadasPorCantidad" 
                :key="fruta.id" 
                :fruta="fruta"
                />
        </ul>
        <a href="#" @click="reiniciarCantidad" class="btn btn-danger btn-block my-2">Reiniciar cantidades</a>
    </div>
</template>

<script>

    import Fruta from '@/components/Fruta.vue'
    import {mapGetters , mapMutations} from 'vuex'

    export default {
        name: 'FrutaLista',
        computed:{
            ...mapGetters (['frutasOrdenadasPorCantidad']),
        },
        methods: {
            ...mapMutations(['reiniciarCantidad'])
        },
        components: {
            Fruta
        }
    }
</script>

<style lang="scss" scoped>

</style>