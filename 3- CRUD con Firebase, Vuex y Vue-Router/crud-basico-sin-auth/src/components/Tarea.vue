<template>
  <tr>
    <th scope="row" class="text-success">{{tarea.id}}</th>
    <td>{{tarea.nombre | limitar(12)}}</td>
    <td>{{tarea.descripcion | limitar(15)}}</td>
    <td>
      <router-link :to="{name: 'View', params: {id: tarea.id}}">
        <button class="btn btn-info text-white btn-sm mx-1">Ver</button>
      </router-link>

      <router-link :to="{name: 'Editar', params: {id: tarea.id} }">
        <button class="btn btn-warning text-white btn-sm mx-1">Editar</button>
      </router-link>

      <a @click.prevent="eliminarTarea(tarea.id)" href="#" class="btn btn-danger text-white btn-sm mx-1">Eliminar</a>
    </td>
  </tr>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Tarea',
    props: ['tarea'],
    methods: {
      ...mapActions(['eliminarTarea'])
    },
    filters:{
      limitar(data, limite){
        return data.length < limite ? data : (data.substring(0, limite) + '....')
      }
    }
}
</script>