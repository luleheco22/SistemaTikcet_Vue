<template>
 <v-layout align-start>
<v-flex>
  <v-data-table
    :headers="headers"
    :items="categorias"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Categorias</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
         <v-text-field class="text-xs-center" v-model="search" append-icon="search" 
                label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                 <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="descripcion" label="Descripción"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-show="valida">
                                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                                    </div>
                                </v-flex>
                            </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardar"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      
         <v-dialog v-model="adModal" max-width="290">
                    <v-card>
                        <v-card-title class="headline" v-if="adAccion==1">
                            Activar Item
                        </v-card-title>
                        <v-card-title class="headline" v-if="adAccion==2">
                            Desactivar Item
                        </v-card-title>
                        <v-card-text>
                            Estás a punto de <span v-if="adAccion==1">activar </span>
                            <span v-if="adAccion==2">desactivar </span> el item {{adNombre}}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="activarDesactivarCerrar()" color="green darken-1" text="text">
                                Cancelar
                            </v-btn>
                            <v-btn v-if="adAccion==1" @click="activar()" color="orange darken-4" text="text">
                                Activar
                            </v-btn>
                            <v-btn v-if="adAccion==2" @click="desactivar()" color="orange darken-4" text="text">
                                Desactivar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.opciones="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <template v-if="item.estado">
      <v-icon
        small
        @click="activarDesactivarMostrar(2,item)"
      >
        block
      </v-icon>
     </template>
      <template v-else="item.estado">
      <v-icon
        small
        @click="activarDesactivarMostrar(1,item)"
      >
        check
      </v-icon>
     </template>
    </template>
     <template v-slot:item.estado="{ item }">
       <div v-if="item.estado">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
     </template>
    
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="listar()"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
  export default {
    data: () => ({
      dialog: false,
      search:'',
      categorias:[],
      dialogDelete: false,

      headers: [
          { text: 'Opciones', value: 'opciones', sortable: false },
          { text: 'Nombre', value: 'nombre', sortable: true },
        { text: 'Descripcion', value: 'descripcion', sortable: false },
          { text: 'Estado', value: 'estado', sortable: false },

      ],
      editedIndex: -1,
      _id:'',
      nombre:'',
      descripcion:'',
      valida:0,
      validaMensaje:[],
      adModal:0,
      adAccion:0,
      adNombre:'',
      adId:''
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    
    },

    created () {
      this.listar()
    },

    methods: {
       async listar(){
            try {
              let me=this
              let header={'Token':this.$store.state.token}
              let configuracion={headers:header}
                const get= await  axios.get('categoria/list',configuracion)
                const data=get.data
                me.categorias=data
            } catch (error) {
                console.log(error)
            }
        },

        limpiar(){
            this._id='';
            this.nombre='';
            this.descripcion='';
            this.valida=0;
            this.validaMensaje=[];
            this.editedIndex=-1
        },

           validar(){
                this.valida=0;
                this.validaMensaje=[];
                if(this.nombre.length<1 || this.nombre.length>50){
                    this.validaMensaje.push('El nombre de la categoría debe tener entre 1-50 caracteres.');
                }
                if(this.descripcion.length>255){
                    this.validaMensaje.push('La descripción de la categoría no debe tener más de 255 caracteres.');
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },

       async guardar(){
        try {
            let me=this
            let header={'Token':this.$store.state.token}
              let configuracion={headers:header}
            if (this.validar()) {
                return
            }
            if (this.editedIndex>-1) {
                //Editar
                  await  axios.put('categoria/update',{
                    '_id':this._id,
                    'nombre':this.nombre,
                'descripcion':this.descripcion
              },configuracion)
              me.limpiar()
              me.close()
              me.listar()
            }else{
                //Guardar
              await  axios.post('categoria/add',{
                'nombre':this.nombre,
                'descripcion':this.descripcion
              },configuracion)
              me.limpiar()
              me.close()
              me.listar()
             
            }
            
        } catch (error) {
           console.log(error)   
        }

        },


     

      editItem (item) {
        this._id=item._id;
        this.nombre=item.nombre;
        this.descripcion=item.descripcion;
        this.dialog = true
        this.editedIndex=1;
      },

     activarDesactivarMostrar(accion,item){
             this.adModal=1
             this.adNombre=item.nombre
             this.adId=item._id

              if (accion==1) {
               this.adAccion=1
              }else if (accion==2) {
                this.adAccion=2
              }else{
                 this.addModal=0
              }
     },

     activarDesactivarCerrar(){
        this.adModal=0
     },

    async activar(){
        try {
            let me=this
            let header={'Token':this.$store.state.token}
              let configuracion={headers:header}
             await  axios.put('categoria/activate',{
                    '_id':this.adId
              },configuracion)
              me.adModal=0
              me.adAccion=0
              me.adNombre=''
              me.adId=''
              me.limpiar()
              me.close()
              me.listar()
            
        } catch (error) {
            console.log(error)
        }
     },
    async desactivar(){
        try {
            let me=this
            let header={'Token':this.$store.state.token}
              let configuracion={headers:header}
             await  axios.put('categoria/desactivate',{
                    '_id':this.adId
              },configuracion)
              me.adModal=0
              me.adAccion=0
              me.adNombre=''
              me.adId=''
              me.limpiar()
              me.close()
              me.listar()
            
        } catch (error) {
            console.log(error)
        }
     },

   

      close () {
        this.dialog = false
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    },
  }
</script>