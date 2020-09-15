<template>
    <div class="row">
        <div class="col-12">
            <h1 class="font-weight-bold text-center my-4">Bienvenido <span class="font-weight-bold text-primary">{{usuario.email}}</span></h1>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'ViewHome',
        computed: {
            ...mapState(['usuario'])
        }
    }
</script>

<style lang="scss" scoped>

</style>