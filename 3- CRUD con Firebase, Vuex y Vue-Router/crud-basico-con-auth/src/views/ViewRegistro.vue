<template>
    <div class="row justify-content-center">
        <div class="col-6">
        <h2 class="text-center py-4">Registro</h2>
            <p v-if="error" class="text-danger text-center font-weight-bold pb-2">{{mostrarError}}</p>
            
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
                        class="form-control" 
                        placeholder="Ingrese su email">

                    <small class="text-danger d-block" v-if="!$v.usuario.email.required && $v.usuario.email.$dirty">
                        El email es requerido
                    </small>

                    <small class="text-danger d-block" v-if="!$v.usuario.email.email">
                        Debe ingresar un email valido
                    </small>
                </div>

                <div class="form-group">
                    <label for="password1">Password</label>
                    <input 
                        v-model.trim="$v.usuario.password.$model" 
                        :class="{
                            'is-invalid': $v.usuario.password.$anyError,
                            'is-valid': (!$v.usuario.password.$anyError && $v.usuario.password.$dirty)
                        }" 
                        @blur="chekearInput($v.usuario.password, $event)"
                        type="password" name="password1" id="password1" 
                        class="form-control" 
                        placeholder="Ingrese su password">

                    <small class="text-danger d-block" 
                           v-if="!$v.usuario.password.required && $v.usuario.password.$dirty">
                        El password es requerido
                    </small>

                    <small class="text-danger d-block" 
                          v-if="!$v.usuario.password.minLength || !$v.usuario.password.maxLength">

                        El password debe tener entre {{ $v.usuario.password.$params.minLength.min }} y 
                        {{ $v.usuario.password.$params.maxLength.max }} caracteres
                    </small>

                    <small class="text-danger d-block" 
                           v-if="!$v.usuario.password.passwordFuerte && $v.usuario.password.$dirty">
                        El password debe contener al menos una letra mayuscula un número y un caracter especial
                    </small>
                </div>

                <div class="form-group">
                    <label for="password2">Repetir Password</label>
                    <input 
                        v-model.trim="$v.usuario.repeatPassword.$model" 
                        :class="{
                            'is-invalid': $v.usuario.repeatPassword.$anyError,
                            'is-valid': (!$v.usuario.repeatPassword.$anyError && $v.usuario.repeatPassword.$dirty)
                        }" 
                        @blur="chekearInput($v.usuario.repeatPassword, $event)"
                        type="password" name="password2" id="password2" 
                        class="form-control" placeholder="Ingrese su password">

                    <small class="text-danger d-block" 
                        v-if="!$v.usuario.repeatPassword.required && $v.usuario.repeatPassword.$dirty">
                        Debe repetir su password
                    </small>

                    <small class="text-danger d-block" 
                        v-if="!$v.usuario.repeatPassword.sameAs && $v.usuario.repeatPassword.$dirty">
                        Los passwords no coinciden    
                    </small>

                </div>

                <div class="form-group mb-0">
                    <button type="submit" class="form-control btn btn-block btn-primary">Registrarse</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import { required, email, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'

    export default {
        name: 'ViewRegistro',
        data(){
            return{
                usuario: {
                    email: '',
                    password: '',
                    repeatPassword: ''
                }
            }
        },
        validations:{
            usuario:{
                email:{
                    required,
                    email
                },
                password:{
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(16),
                    passwordFuerte(password){
                        return (
                            /[a-z]/.test(password) && // checks for a-z
                            /[A-Z]/.test(password) && // checks for a-z
                            /[0-9]/.test(password) && // checks for 0-9
                            /\W|_/.test(password)  // checks for special char
                        );
                    }
                },
                repeatPassword:{
                    required,
                    sameAs: sameAs('password')
                }
            }
        },
        methods:{
            ...mapActions(['registrarUsuario']), 

            enviarFormulario(){
                /* PARA QUE VALIDE TODOS LOS CAMPOS */
                this.$v.$touch()
                /* SI NO EXISTEN ERRORES */
                if(!this.$v.$invalid){
                    /* AGREGO LA TAREA Y EVITO QUE PULSEN MAS DE UNA VEZ EL BOTÓN DE ENVIAR */
                    this.registrarUsuario(this.usuario)
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
            },

        },
        computed:{
            ...mapState(['error']),

            mostrarError(){
                const inputs = document.getElementsByTagName('input')
                inputs.forEach(element => {
                    if(element.type == 'email' ){
                        this.usuario.email = ''
                        element.classList.replace('is-valid', 'is-invalid')
                        element.classList.add('inputInvalidoError')
                    }
                });

                return this.error
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