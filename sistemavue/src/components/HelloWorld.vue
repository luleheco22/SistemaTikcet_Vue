<template>
  <v-container>
    <v-row class="text-center">
    

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
         Bienvenido  {{usuarioZ}}
        </h1>

       
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    

   data(){
        return {
          usuarioZ:''
        }
    },
        created() {
        this.usuarioM()
      
    },
    methods: {
        usuarioM(){
          let me=this
           let  usuario={'Usuario':this.$store.state.usuario}
       console.log(usuario.Usuario.nombre)
       return me.usuarioZ=usuario.Usuario.nombre

        },
      
    }
  }
  
</script>
