<template>
    <div class="row justify-content-center">
        <div class="col-6">
        <h2 class="text-center py-4">Registro</h2>
            <p v-if="error" class="text-danger text-center font-weight-bold pb-2">{{error}}</p>
            
            <form @submit.prevent="registrarUsuario(usuario)" class="formulario">
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="usuario.email" type="email" name="email" id="email" class="form-control" placeholder="Ingrese su email" required>
                </div>

                <div class="form-group">
                    <label for="password1">Password</label>
                    <input v-model="usuario.password" type="password" name="password1" id="password1" class="form-control" placeholder="Ingrese su password" required>
                </div>

                <div class="form-group">
                    <label for="password2">Repetir Password</label>
                    <input v-model="usuario.repeat" type="password" name="password2" id="password2" class="form-control" placeholder="Ingrese su password" required>
                </div>

                <div class="form-group mb-0">
                  <input :disabled="!autorizar" type="submit" class="form-control btn btn-block btn-primary" value="Ingresar">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'ViewRegistro',
        data(){
            return{
                usuario: {
                    email: '',
                    password: '',
                    repeat: ''
                }
            }
        },
        methods:{
            ...mapActions(['registrarUsuario'])
        },
        computed:{
            ...mapState(['error']),
            autorizar(){
                return this.usuario.password === this.usuario.repeat && this.usuario.password.length > 0 ? true : false
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
</style>