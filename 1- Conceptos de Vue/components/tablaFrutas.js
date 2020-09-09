const tablaFrutas = {
    name: 'tabla-frutas',
    template: /* html */ `
        <section class="px-5">
            <h2 class="text-info">Primer Componente: Tabla de Frutas</h2>
            <p class="h5 font-weight-bold">Repasando los conceptos de data, methods, computed, watch, componentes globales y locales, eventos, localstorage, clases dinamicas con vue, etc.</p>

            <fruta-progreso :progreso="progresoFruta"></fruta-progreso>

            <div class="d-flex justify-content-between">
                <form  v-if="cantidadFruta < 10" @submit.prevent="agregarNuevaFruta">
                    <div class="form-inline my-3">

                            <input 
                                required
                                v-model="nuevaFruta"
                                type="text"
                                class="form-control w-50 mr-1" 
                                placeholder="Nombre de la fruta">

                            <button 
                                type="submit" 
                                class="btn btn-primary form-control">
                                Agregar Fruta
                            </button> 

                    </div>
                </form>

                <form>
                    <div class="form-inline my-3">
                        <div class="input-group">
                            <input v-model="busqueda" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
                            <div class="input-group-append">
                                <button class="btn btn-success" type="button">Buscar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <table class="table text-center">
                <thead class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Fruta</th>
                        <th>Cantidad</th>
                        <th>Stock</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <fruta 
                        v-for="fruta in filtrarFrutas" 
                        :fruta="fruta" 
                        :key="fruta.id"
                        @incrementarFruta="incrementarFruta"
                        @restarFruta="restarFruta"
                        @eliminarFruta="eliminarFruta">
                    </fruta>
                    <tr>
                        <th></th><td></td><td></td><td></td>
                        <td class="text-dark font-weight-bold">Total {{ calcularTotal }} frutas</td>
                    </tr>
                </tbody>
            </table>

        </section>

        
    `,
    created(){
        if(JSON.parse(window.localStorage.getItem('frutas'))){
            this.frutas = JSON.parse(window.localStorage.getItem('frutas'));
        }
    },
    data(){
        return{
            frutas: [], 
            total: 0,
            nuevaFruta: '',
            busqueda: '',
        }
    },
    methods:{
        stock(fruta){
            return fruta.cantidad > 0 ? 'Disponible' : 'Sin Stock'
        },
        incrementarFruta(id){
            this.frutas.find(fruta => fruta.id === id).cantidad++;
        },
        restarFruta(id){
            if(this.frutas.find(fruta => fruta.id === id).cantidad > 0){
                this.frutas.find(fruta => fruta.id === id).cantidad--;
            }
        },
        eliminarFruta(id){
           this.frutas.forEach( (fruta, index) => {
              if(fruta.id === id){
                  this.frutas.splice(index, 1);
              }
           })
        },
        agregarNuevaFruta(){
            this.frutas.push({
                id: this.ultimoId + 1,
                nombre: this.nuevaFruta,
                cantidad: 0
            });
    
            this.nuevaFruta = '';
            
        },

    },
    computed:{

        calcularTotal(){
            this.total = 0;
            this.filtrarFrutas.forEach(fruta => {
                this.total += fruta.cantidad
            });

            return this.total;
        },

        filtrarFrutas(){
            if(this.frutas.length > 0){
                return this.frutas.filter( fruta => fruta.nombre.includes(this.busqueda))
            }else{
                return this.frutas = []
            }
        },

        ultimoId(){
            return this.frutas.length > 0 ? this.frutas[this.frutas.length - 1].id : 0            
        },

        cantidadFruta(){
            return this.frutas.length;
        },

        progresoFruta(){
            return this.cantidadFruta * 10;
        }
    },
    watch:{
        frutas:{
            deep:true,
            handler: (newValue, oldValue) => {
                window.localStorage.setItem('frutas', JSON.stringify(newValue))
            }
        },
    },
    components:{
        fruta, 
        frutaProgreso
    }
}