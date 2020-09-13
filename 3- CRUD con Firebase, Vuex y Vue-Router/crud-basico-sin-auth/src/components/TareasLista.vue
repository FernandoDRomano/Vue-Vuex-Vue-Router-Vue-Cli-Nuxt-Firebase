<template>
    <div class="">
        <h3 class="font-weight-bold text-center text-danger">Lista de Tareas con Vue y Firebase</h3>

        <router-link :to="{name: 'Agregar'}">
            <button class="btn btn-sm btn-primary text-left my-2">Agregar Tarea</button>
        </router-link>

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
                <Tarea v-for="tarea in tareas" :key="tarea.id" :tarea="tarea"></Tarea>
            </tbody>
        </table>


    </div>
</template>

<script>

import Tarea from '@/components/Tarea.vue'
import {mapState} from 'vuex'

export default {
    name: 'TareasLista',
    data(){
        return{
            
        }
    },
    computed: {
        ...mapState(['tareas'])
    },
    components:{
        Tarea
    }
}
</script>