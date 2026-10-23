import { createRouter, createWebHistory } from 'vue-router'    // funciones del enrutador
import CatalogoView from '../views/CatalogoView.vue'            // la vista de entrada sí va en el paquete inicial

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),          // direcciones limpias, sin #; BASE_URL vale '/'
  routes: [
    { path: '/', component: CatalogoView },                     // se necesita al abrir la página
    { path: '/reportes', component: () => import('../views/ReportesView.vue') }, // se descarga al visitar la ruta
    { path: '/admin', component: () => import('../views/AdminView.vue') }        // igual: fragmento aparte
  ]
})
