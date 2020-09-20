<template>
    <div class="">
        <h3 class="font-weight-bold text-center text-danger">Lista de Tareas con Vue y Firebase</h3>

        <div v-if="cargando" class="text-center my-5">
            <b-spinner variant="success" label="Spinning"></b-spinner>
            <p class="font-weight-bold text-success h4">Cargando....</p>
        </div>

        <section v-if="!cargando">

            <div class="d-flex justify-content-between align-items-center">
                <router-link :to="{name: 'Agregar'}">
                    <button class="btn btn-sm btn-primary text-left my-2">Agregar Tarea</button>
                </router-link>

                <form class="form-inline">
                    <input v-model="busqueda" type="text" placeholder="Buscar tarea" class="form-control form-control-sm">
                    <div class="input-group-append">
                        <button class="btn btn-success btn-sm" type="button">Buscar</button>
                    </div>
                </form>
            </div>

            <table class="table table-sm">
            <thead class="thead-dark">
                <tr>
                    <th>Identificador</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <Tarea v-for="tarea in tareasFitradas" :key="tarea.id" :tarea="tarea"></Tarea>
            </tbody>

        </table>

        </section>


    </div>
</template>

<script>

import Tarea from '@/components/Tarea.vue'
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
    name: 'TareasLista',
    data(){
        return{
            busqueda: ''
        }
    },
    computed: {
        ...mapGetters(['tareasFitradas']),
        ...mapState(['cargando'])
    },
    methods:{
        ...mapMutations(['setBusqueda'])
    },
    watch:{
        busqueda(newValue){
            this.setBusqueda(newValue)
        }
    },
    components:{
        Tarea
    }
}
</script>