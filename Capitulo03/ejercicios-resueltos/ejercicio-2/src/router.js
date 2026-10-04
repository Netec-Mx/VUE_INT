import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './stores/auth'
import TiendaLayout from './layouts/TiendaLayout.vue'
import Catalogo from './views/Catalogo.vue'
import Carrito from './views/Carrito.vue'
import Pedidos from './views/Pedidos.vue'
import PedidoDetalle from './views/PedidoDetalle.vue'
import Promos from './views/Promos.vue'
import Prohibido from './views/Prohibido.vue'

const routes = [
  { path: '/', redirect: '/tienda' },
  {
    path: '/tienda',
    component: TiendaLayout,
    children: [
      { path: '', name: 'catalogo', component: Catalogo },
      { path: 'carrito', name: 'carrito', component: Carrito },
      // La política se DECLARA aquí y se APLICA una sola vez en el beforeEach de abajo.
      { path: 'pedidos', name: 'pedidos', component: Pedidos, meta: { roles: ['vendedor'] } },
      { path: 'pedidos/:id', name: 'pedido-detalle', component: PedidoDetalle, props: true },
      { path: 'promos', name: 'promos', component: Promos, meta: { soloInvitados: true } },
      // Destinos de rescate: sin meta, así que ninguna redirección puede volver a entrar aquí.
      { path: 'prohibido', name: 'prohibido', component: Prohibido },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Único punto de control de acceso de toda la aplicación.
router.beforeEach((to) => {
  const auth = useAuth()

  // Rutas por rol: to.meta ya viene fusionado de padre a hijo.
  if (to.meta.roles && !to.meta.roles.includes(auth.rol)) {
    return { name: 'prohibido' }
  }

  // Rutas exclusivas de visitantes: con sesión activa no tienen sentido.
  if (to.meta.soloInvitados && auth.isLoggedIn) {
    return { name: 'catalogo' }
  }

  // Cualquier otro caso sigue su curso: no se retorna nada.
})

router.afterEach((to, from, failure) => {
  if (failure) console.warn('Navegación no completada:', failure.type, to.path)
})

export default router
