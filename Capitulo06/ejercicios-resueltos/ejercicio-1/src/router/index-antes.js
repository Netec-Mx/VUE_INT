// LÍNEA BASE ("antes"): las cuatro vistas se importan de forma estática.
// Todo, incluida la librería de gráficas de Reportes, termina en el chunk de entrada.
// Se construye con: npm run build:antes
import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Pedidos from '../views/Pedidos.vue'
import Reportes from '../views/Reportes.vue'
import Admin from '../views/Admin.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Inicio },
    { path: '/pedidos', component: Pedidos },
    { path: '/reportes', component: Reportes },
    { path: '/admin', component: Admin }
  ]
})
