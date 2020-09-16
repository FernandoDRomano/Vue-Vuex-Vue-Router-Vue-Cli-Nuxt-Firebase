<template>
    <div>
        <h2 class="text-center text-success">Nombre: {{tarea.nombre}}</h2>
        <p> <span class="font-weight-bold">Descripción:</span> {{tarea.descripcion}}</p>
        <p> <span class="font-weight-bold">Identificador:</span> {{tarea.id}}</p>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'ViewTarea',
        data(){
            return{
                id: this.$route.params.id
            }
        },
        computed:{
            ...mapState(['tarea'])
        },
        methods:{
            ...mapActions(['getTarea'])
        },
        created(){
            this.getTarea(this.id)
        }
    }
</script>

<style lang="scss" scoped>

</style>