// RESULTADO ("después"): la vista pesada (Reportes) y la poco visitada (Admin)
// se cargan con import() dinámico, así que cada una se convierte en un chunk propio.
// La pestaña Network muestra que ese chunk se pide al navegar a la ruta, no al arrancar la aplicación.
// Se construye con: npm run build
import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'

// Inicio se queda estático: es la primera pantalla y diferirla empeoraría el LCP.
// Las demás usan una función que solo se ejecuta cuando el usuario entra a la ruta.
const Pedidos = () => import('../views/Pedidos.vue')
const Reportes = () => import('../views/Reportes.vue')
const Admin = () => import('../views/Admin.vue')

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Inicio },
    { path: '/pedidos', component: Pedidos },
    { path: '/reportes', component: Reportes },
    { path: '/admin', component: Admin }
  ]
})
