<template>
  <tr>
    <th scope="row" class="text-success">{{tarea.id}}</th>
    <td>{{tarea.nombre}}</td>
    <td>{{tarea.descripcion}}</td>
    <td>
      <router-link :to="{name: 'Editar', params: {id: tarea.id} }">
        <button class="btn btn-warning text-white btn-sm mx-1">Editar</button>
      </router-link>

      <a href="#" class="btn btn-danger text-white btn-sm mx-1">Eliminar</a>
    </td>
  </tr>
</template>

<script>
export default {
    name: 'Tarea',
    props: ['tarea']  
}
</script>