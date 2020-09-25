<template>
    <v-row justify="center">
        <v-col cols="6">
            <h1 class="text-center font-weight-bold warning--text text-h1 my-5">Vuetify</h1>
        </v-col>
        <v-col cols=12>
            <p class="text--error text-h3 mt-3 text-center">Feriados de Argentina </p>
            <v-select
                @change="obtenerFeriados"
                class="mt-5"
                v-model="selectYear"
                :items="listadoDeYears"
                label="Seleccione un Año"
                solo
            ></v-select>
        </v-col>
        <v-col cols=6 v-if="cargando">
            <p class="text-center font-weight-bold text-h6">Cargando....</p>
            <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
        <v-col cols="12" v-if="!cargando && feriados.length > 0">
             <v-date-picker 
                :value="yearMin"
                :min="yearMin"
                :max="yearMax"
                :full-width="true"
                :events="fechasEventos"
                event-color="red"
                @change="mostrarFeriado($event)"
                color="blue lighten-1">
            </v-date-picker>
        </v-col>
        <v-col cols="12" v-if="!cargando && feriado">
            <h3 class="text-center font-weight-bold primary--text text-h3 my-3">
                {{feriado}} 
            </h3>
        </v-col>
        <v-col cols="12" v-if="!cargando && feriados.length > 0">
            <v-card>
                <p class="text-center my-4 info--text text-h5 py-5">Todos los feriados</p>
                <v-list-item v-for="feriado in feriados" :key="feriado.date">
                    <v-list-item-content>
                        <v-list-item-title class="text-h5"> 
                            <span class="font-weight-bold mx-4">{{ feriado.fecha | ordenarFecha}}</span>
                            <span class="success--text">{{feriado.nombre}} </span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Feriados',
    data(){
        return{
             yearMinimo: 2015,
             yearMaximo: new Date().getFullYear(),
             selectYear: '',
             feriados: [],
             feriado: '',
             cargando: false
        }
    },
    computed: {
        listadoDeYears(){
            const lista = []
            for (let index = this.yearMinimo; index <= this.yearMaximo; index++) {
                lista.push(index)
            }
            return lista
        },
        yearMax(){
            return `${this.selectYear}-12-31`
        },
        yearMin(){
            return `${this.selectYear}-01-01`
        },
        fechasEventos(){
            return this.feriados.map( element => element.fecha)
        }
    },
    methods: {
        obtenerFeriados(){
            const url = `http://localhost:8080/api/v2/PublicHolidays/${this.selectYear}/AR`;
            
            this.cargando = true
        
            fetch(url)
                .then(respuesta => respuesta.json())
                .then(data => {

                    this.feriados = []
                    this.feriado = ''

                    data.forEach(element => {
                        const feriado = {
                            fecha: element.date,
                            nombre: element.localName
                        }        

                        this.feriados.push(feriado)
                        this.cargando = false
                    });

                })
                .catch(error => {
                    this.cargando = false
                    console.error(error)
                })

        },

        mostrarFeriado(evento){
            this.feriado = ''

            const dato = this.feriados.find(elemento => elemento.fecha === evento)

            dato ? this.feriado = dato.nombre : this.feriado = 'No hay feriado en la fecha indicada'        

        }
    },
    filters:{
        ordenarFecha(value){
            const fecha = value.split('-');
            return fecha[2] + '-' + fecha[1] + '-' + fecha[0]
        }
    }
}
</script>