<template>
    <v-row>
        <v-col cols="12" md="8" class="mx-auto mt-4">
            <v-card>
                <v-card-text class="text-center">
                    <h2>Bienvenido <span class="font-weight-italic">{{usuario.nombre}}</span></h2>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'viewDashboard',
    computed: {
        ...mapState(['usuario'])
    },
}
</script>