<template>
    <div class="row justify-content-center">
        <div class="col-6">
        <h2 class="text-center py-4">Login</h2>
            <p v-if="error" class="text-danger text-center font-weight-bold pb-2">{{error}}</p>
            <form @submit.prevent="loginUsuario(usuario)" class="formulario">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="usuario.email" type="email" name="email" id="email" class="form-control" placeholder="Ingrese su email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="usuario.password" type="password" name="password" id="password" class="form-control" placeholder="Ingrese su password" required>
                </div>

                <div class="form-group mb-0">
                  <input type="submit" class="form-control btn btn-block btn-primary" value="Ingresar">
                </div>
            </form>


        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

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
            ...mapActions(['loginUsuario'])
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