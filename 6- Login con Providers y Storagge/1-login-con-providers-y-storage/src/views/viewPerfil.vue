<template>
    <v-row class="justify-center">
        <v-col cols="8">
            <v-card class="text-center">
                <v-card-text>
                    <v-img
                        class="mx-auto rounded-circle"
                        :src="usuario.foto"
                        height="200"
                        width="200">
                    </v-img>
                </v-card-text>
                <v-card-text class="pt-0">
                    <h3>{{usuario.nombre}}</h3>
                </v-card-text>
                <v-card-text class="py-0">
                    <input 
                        type="file" 
                        v-show="false" 
                        ref="inputBuscar" 
                        @change="buscarImagen($event)" 
                        accept="image/*">
                </v-card-text>
                <v-card-text>
                    <v-btn
                        class="mx-2"
                        color="info"
                        @click="$refs.inputBuscar.click()">
                        Buscar Imagen
                    </v-btn>
                    <v-btn
                        @click="subir()"
                        :disabled="file === null"
                        :loading="cargaImagen"
                        class="mx-2"
                        color="secondary">
                        Subir Imagen
                    </v-btn>
                </v-card-text>
                <v-card-text v-if="file">
                    <h4>{{file.name}}</h4>
                    <v-img 
                        class="mx-auto"
                        :src="urlImagen">

                    </v-img>
                </v-card-text>
                <v-card-text v-if="mensaje" class="pt-0">
                    <p class="mb-0">{{mensaje}}</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'Perfil',
    data() {
        return {
            file: null,
            urlImagen: '',
            mensaje: '',
            cargaImagen: false
        }
    },
    methods: {
        ...mapActions(['subirImagen']),
        buscarImagen(evento){
            this.file = evento.target.files[0]
            //PARA MOSTRAR UNA PREVISUALIZACIÓN
            this.urlImagen = URL.createObjectURL(this.file);
            this.mensaje = ''
        },
        async subir(){

            try {
                this.cargaImagen = true;
                await this.subirImagen(this.file)
                this.cargaImagen = false;
                this.file = null
                this.mensaje = "Imagen subida con exito"
            } catch (error) {
                console.error(error)
            }
        
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
}
</script>