<template>
    <v-layout align-center justify-center>
        <v-flex zs12 sm8 md6 lg5 x14>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field autofocus v-model="email" color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field type="password" v-model="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                         {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>

    </v-layout>
</template>

<script>
import axios from 'axios'
export default {   
    data(){
        return {
            email:'',
            password:'',
            errorM:null
        }
    },
    methods:{
      async  ingresar(){
        try {
         const login=   await axios.post('usuario/login',{
                email:this.email,
                password:this.password
            })
            const res=login.data
          await  this.$store.dispatch('guardarToken',res.tokenReturn)
           await  this.$router.push({name:'home'})
        } catch (error) {
            this.errorM=null;
            if (error.response.status===404) {
                this.errorM='No existe el usuario o las credenciales son incorrectas'
            }else{
                this.errorM='Ocurrio un error con el servidor'
            }
        }
        },

    }
}
</script>