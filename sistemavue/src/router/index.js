import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'
import Categoria from '../components/Categoria.vue'
import Login from '../components/Login.vue'
import Usuario from '../components/Usuario.vue'
import Ticket from '../components/Ticket.vue'
import Cliente from '../components/Cliente.vue'
import consultaTicket from '../components/ConsultaTicket.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      administrador:true,
      gerente:true,
      analista:true,
      cliente:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
    libre:true
    }
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: Categoria,
    meta:{
      administrador:true,
      gerente:true,
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: Usuario,
    meta:{
      administrador:true,
    }
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: Ticket,
    meta:{
      administrador:true,
      gerente:true
    }
  },
  {
    path: '/persona',
    name: 'persona',
    component: Cliente,
    meta:{
      administrador:true,
      gerente:true,
      analista:true,
      cliente:true
    }
  },
  {
    path: '/consultaTicket',
    name: 'consultaTicket',
    component: consultaTicket,
    meta:{
      administrador:true,
      gerente:true,
      analista:true,
      cliente:true
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const {usuario}=store.state
   if (to.matched.some(record => record.meta.libre)){
 next()
 }else if (usuario && usuario.rol=='Administrador'){
    if (to.matched.some(record => record.meta.administrador)){
       next()
    }
 }else if (usuario && usuario.rol=='Gerente'){
    if (to.matched.some(record => record.meta.gerente)){
       next()
    }
 }else if (usuario && usuario.rol=='Analista'){
  if (to.matched.some(record => record.meta.analista)){
     next()
  }
 }else if (usuario && usuario.rol=='Cliente'){
  if (to.matched.some(record => record.meta.cliente)){
     next()
  }
}else{
  next({name:'login'})
}

})
export default router
