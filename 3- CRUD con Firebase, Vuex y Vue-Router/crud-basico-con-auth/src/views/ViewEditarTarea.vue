<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <h4 class="text-center font-weight-bold py-3">Editar Tarea</h4>
            <form @submit.prevent="enviarFormulario" class="formulario">

                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input 
                        v-model.trim="$v.tarea.nombre.$model" 
                        :class="{
                            'is-invalid': $v.tarea.nombre.$anyError, 
                            'is-valid': (!$v.tarea.nombre.$anyError && $v.tarea.nombre.$dirty)
                            }" 
                        @blur='chekearInput($v.tarea.nombre, $event)'
                        type="text" name="nombre" 
                        id="nombre" 
                        placeholder="Ingresar el nombre de la tarea" 
                        class="form-control">
                    <small class="text-danger" 
                        v-if="!$v.tarea.nombre.required && $v.tarea.nombre.$dirty">
                        Este campo es requerido
                    </small>
                    <small class="text-danger" 
                        v-if="!$v.tarea.nombre.minLength || !$v.tarea.nombre.maxLength">
                        El campo debe tener entre {{ $v.tarea.nombre.$params.minLength.min }} y 
                        {{ $v.tarea.nombre.$params.maxLength.max }} caracteres.
                    </small>
                </div>

                <div class="form-group">
                    <label for="descripcion">Descripción</label>
                    <textarea 
                        v-model.trim="$v.tarea.descripcion.$model" 
                        :class="{
                            'is-invalid': $v.tarea.descripcion.$anyError,
                            'is-valid': (!$v.tarea.descripcion.$anyError && $v.tarea.descripcion.$dirty)
                            }"
                        @blur='chekearInput($v.tarea.descripcion, $event)'
                        name="descripcion" id="descripcion" cols="30" rows="5" 
                        class="form-control" 
                        placeholder="Ingrese una descripción....">
                    </textarea>
                    <small class="text-danger d-block" 
                        v-if="!$v.tarea.descripcion.required && $v.tarea.descripcion.$dirty">
                        Este campo es requerido
                    </small>
                    <small class="text-danger d-block" 
                        v-if="!$v.tarea.descripcion.minLength || !$v.tarea.descripcion.maxLength">
                        El campo debe tener entre {{ $v.tarea.descripcion.$params.minLength.min }} y 
                        {{ $v.tarea.descripcion.$params.maxLength.max }} caracteres.
                    </small>
                    <small class="text-danger d-block"
                        v-if="!$v.tarea.descripcion.caracteresPermitidos && $v.tarea.descripcion.$dirty">
                        Solo se permiten números [0-9], letras [a-z] y los siguientes caracteres especiales !@#$%^&*():+=.,_-
                    </small>
                </div>

                <div class="form-group">
                    <input :disabled="noEnviarMasDeUnaVez" type="submit" value="Guardar Tarea" class="btn btn-warning btn-block text-white">
                </div>

            </form>
        </div>
    </div>
</template>
<script>

import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import {mapActions, mapState} from 'vuex'

export default {
    name: 'EditarTarea',
    data(){
        return{
            id: this.$route.params.id,
            noEnviarMasDeUnaVez: false,
        }
    },
    validations:{
        tarea:{
            nombre:{
                required,
                minLength: minLength(4),
                maxLength: maxLength(20)
            },
            descripcion:{
                required,
                minLength: minLength(5),
                maxLength: maxLength(150),
                caracteresPermitidos(descripcion){
                    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9!@#$%^&*)(:+=.,_-\s]+$/g;
                    return regex.test(descripcion)
                }
            }
        }
    },
    computed: {
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['getTarea', 'updateTarea']),
        enviarFormulario(){
            /* PARA QUE VALIDE TODOS LOS CAMPOS */
            this.$v.$touch()
            /* SI NO EXISTEN ERRORES */
            if(!this.$v.$invalid){
                /* AGREGO LA TAREA Y EVITO QUE PULSEN MAS DE UNA VEZ EL BOTÓN DE ENVIAR */
                this.updateTarea(this.tarea)
                this.noEnviarMasDeUnaVez = true
            }else{
                //NO PASA LAS VALIDACIONES
                console.log("Existe errores no se puede enviar")
            }
        },
        chekearInput (val, event) {
            if (val.$anyError) {
                event.target.classList.add('inputInvalidoError')
                setTimeout(() => {
                    event.target.classList.remove('inputInvalidoError')
                }, 600)
            }
        }
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

    .inputInvalidoError {
        animation: shake 0.2s 3;
    }

    @keyframes shake {
        0% { transform: translateX(0px)  }
        25% { transform: translateX(5px) }
        50% { transform: translateX(0px)  }
        75% { transform: translateX(-5px) }
        100% { transform: translateX(0px)  }
    }

</style>