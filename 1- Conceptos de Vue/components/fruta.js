const fruta = {
    name: 'fruta',
    template: /* html */ `
    <tr>
        <th> {{ fruta.id }} </th>
        <td> 
            <input 
                @keyup.enter="editarFruta(fruta.id)"
                v-model="fruta.nombre" 
                :disabled="habilitar"
                class="form-control text-center"> 
        </td>
        <td> {{ fruta.cantidad }} </td>
        <td> 
            <span class="badge badge-pill" 
            :class="{ 'badge-success': fruta.cantidad > 0,  'badge-secondary': fruta.cantidad == 0, }">
            {{stock(fruta)}}
            </span>
        </td>
        <td> 
            <button @click="incrementarFruta(fruta.id)" class="btn btn-info font-weight-bold">+</button> 
            <button @click="restarFruta(fruta.id)" class="btn btn-warning text-white font-weight-bold">-</button> 
            <button @click="eliminarFruta(fruta.id)" class="btn btn-danger text-white font-weight-bold">Eliminar</button> 
            <button @click="editarFruta(fruta.id)" class="btn btn-success text-white font-weight-bold">Editar</button> 
        </td>
    </tr>
    `,
    props: ['fruta'],
    data(){
        return{
            habilitar: true
        }
    },
    methods: {
        stock(fruta){
            return fruta.cantidad > 0 ? 'Disponible' : 'Sin Stock'
        },
        incrementarFruta(id){
            this.$emit('incrementarFruta', id)
        },
        restarFruta(id){
           this.$emit('restarFruta', id)
        },
        eliminarFruta(id){
           this.$emit('eliminarFruta', id)
        },
        editarFruta(id){
            this.habilitar = !this.habilitar
        }
    },
    computed:{
        
    }
}

/* 

<tr v-for="(fruta, $index) in filtrarFrutas" >
                        <th> {{ fruta.id }} </th>
                        <td> {{ fruta.nombre }} </td>
                        <td> {{ fruta.cantidad }} </td>
                        <td> 
                            <span class="badge badge-pill" 
                            :class="{ 'badge-success': fruta.cantidad > 0,  'badge-secondary': fruta.cantidad == 0, }">
                            {{stock(fruta)}}
                            </span>
                        </td>
                        <td> 
                            <button @click="incrementarFruta(fruta.id)" class="btn btn-info font-weight-bold">+</button> 
                            <button @click="restarFruta(fruta.id)" class="btn btn-warning text-white font-weight-bold">-</button> 
                            <button @click="eliminarFruta(fruta.id)" class="btn btn-danger text-white font-weight-bold">Eliminar</button> 
                        </td>
                    </tr>

*/