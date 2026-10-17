import { createRouter, createWebHistory } from 'vue-router'
import InicioVista from './vistas/InicioVista.vue'
import CatalogoVista from './vistas/CatalogoVista.vue'

export const router = createRouter({
  history: createWebHistory(), // URL limpias como /catalogo: Nginx tendrá que entenderlas
  routes: [
    { path: '/', component: InicioVista },
    { path: '/catalogo', component: CatalogoVista }
  ]
})
