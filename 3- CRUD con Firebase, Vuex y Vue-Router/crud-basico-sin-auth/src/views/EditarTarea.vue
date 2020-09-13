<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <h4 class="text-center font-weight-bold py-3">Editar Tarea</h4>
            {{id}} - {{tarea}}
            <form @submit.prevent="updateTarea(tarea)" class="formulario">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input v-model="tarea.nombre" type="text" name="nombre" id="nombre" placeholder="Ingresar el nombre de la tarea" class="form-control">
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripción</label>
                    <textarea v-model="tarea.descripcion" name="descripcion" id="descripcion" cols="30" rows="5" class="form-control" placeholder="Ingrese una descripción...."></textarea>
                </div>
                <div class="form-group">
                    <input type="submit" value="Guardar Tarea" class="btn btn-warning btn-block text-white">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'EditarTarea',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    computed: {
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['getTarea', 'updateTarea'])
    },
    created() {
        this.getTarea(this.id)
    },
}
</script>

<style lang="scss" scoped>
        .formulario{
        border: 1px solid rgb(223, 223, 223);
        border-radius: 2rem;
        padding: 1.5rem 2rem;
        margin-bottom: 2rem;
    }
</style>