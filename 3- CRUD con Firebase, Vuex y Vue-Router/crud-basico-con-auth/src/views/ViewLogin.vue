<template>
    <div class="row justify-content-center">
        <div class="col-6">
        <h2 class="text-center py-4">Login</h2>
            <p v-if="error" class="text-danger text-center font-weight-bold pb-2">{{error}}</p>
            <form @submit.prevent="enviarFormulario" class="formulario">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                        v-model.trim="$v.usuario.email.$model" 
                        :class="{
                            'is-invalid': $v.usuario.email.$anyError,
                            'is-valid': (!$v.usuario.email.$anyError && $v.usuario.email.$dirty)
                        }"
                        @blur="chekearInput($v.usuario.email, $event)"
                        type="email" name="email" id="email" 
                        class="form-control" placeholder="Ingrese su email">
                    <small class="text-danger" v-if="!$v.usuario.email.required && $v.usuario.email.$dirty">
                        Debe ingresar su email
                    </small>
                    <small class="text-danger" v-if="!$v.usuario.email.email">
                        Debe ingresar un email valido
                    </small>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        v-model.trim="$v.usuario.password.$model"
                        :class="{
                            'is-invalid': $v.usuario.password.$anyError,
                            'is-valid': (!$v.usuario.password.$anyError && $v.usuario.password.$dirty)
                        }" 
                        @blur="chekearInput($v.usuario.password, $event)"
                        type="password" name="password" id="password" 
                        class="form-control" 
                        placeholder="Ingrese su password">
                    <small class="text-danger" 
                           v-if="!$v.usuario.password.required && $v.usuario.password.$dirty">
                        Debe ingresar su password
                    </small>
                </div>

                <div class="form-group mb-0">
                  <input  type="submit" class="form-control btn btn-block btn-primary" value="Ingresar">
                </div>
            </form>


        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        name: 'ViewLogin',
        data(){
            return{
                usuario:{
                    email: '',
                    password: ''
                }
            }
        },
        computed:{
            ...mapState(['error'])
        },
        methods: {
            ...mapActions(['loginUsuario']),

            chekearInput (val, event) {
                if (val.$anyError) {
                    event.target.classList.add('inputInvalidoError')
                    setTimeout(() => {
                        event.target.classList.remove('inputInvalidoError')
                    }, 600)
                }
            },

            enviarFormulario(){
                /* PARA QUE VALIDE TODOS LOS CAMPOS */
                this.$v.$touch()
                /* SI NO EXISTEN ERRORES */
                if(!this.$v.$invalid){
                    /* AGREGO LA TAREA Y EVITO QUE PULSEN MAS DE UNA VEZ EL BOTÓN DE ENVIAR */
                    this.loginUsuario(this.usuario)
                }else{
                    //NO PASA LAS VALIDACIONES
                    console.log("Existe errores no se puede enviar")
                }
            },
        },
        validations:{
            usuario:{
                email:{
                    required,
                    email
                },
                password:{
                    required
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .formulario{
        border: 1px solid rgb(192, 190, 190);
        border-radius: 2rem;
        padding: 2rem;
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