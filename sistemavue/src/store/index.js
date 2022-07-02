import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    usuario:null,
    name:null,
    _id:null
  },
  getters: {
  },
  mutations: {
    setToken(state,token){
      state.token=token
    },
    
    setUsuario(state,usuario){
         state.usuario=usuario
    },
    setName(state,name){
         state.name=name
    },
    setId(state,_id){
         state._id=_id
    }
  },
  actions: {
    guardarToken({commit},token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      commit("setName", decode(token))
      commit("setId", decode(token))
      localStorage.setItem("token", token)
       
    },

    autoLogin({commit}){
      let token = localStorage.getItem("token")
      if(token) {
      commit("setToken", token)
      commit("setUsuario", decode(token))
      commit("setName", decode(token))
      commit("setId", decode(token))
      }
      router.push({name: 'home'})
     
    },

    salir({commit}){
      commit("setToken", null)
      commit("setUsuario", null)
      commit("setName", null)
      commit("setId",null)
      localStorage.removeItem("token")
      router.push({name: 'login'})
     
    }
  },
  modules: {
  }
})
