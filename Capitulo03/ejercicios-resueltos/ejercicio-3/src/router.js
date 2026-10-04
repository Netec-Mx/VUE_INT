import { createRouter, createWebHistory } from 'vue-router'
// Inicio es lo único estático: es la primera pantalla y debe estar en el bundle principal.
import Inicio from './views/Inicio.vue'

// Cada cargador es solo una función; llamarla descarga el archivo y cachea la promesa.
// El layout, el catálogo y el carrito quedan en el mismo chunk por manualChunks (vite.config.js).
const TiendaLayout = () => import('./layouts/TiendaLayout.vue')
const Catalogo = () => import('./views/Catalogo.vue')
const Carrito = () => import('./views/Carrito.vue')
const PedidoDetalle = () => import('./views/PedidoDetalle.vue')

// Prefetch del grupo completo de la tienda: se invoca desde el hover del enlace.
// Llamarlo varias veces no descarga de más, la promesa del módulo se resuelve una sola vez.
export function precargarTienda() {
  return Promise.all([TiendaLayout(), Catalogo(), Carrito()])
}

const routes = [
  { path: '/', name: 'inicio', component: Inicio },
  {
    path: '/tienda',
    component: TiendaLayout,
    children: [
      { path: '', name: 'catalogo', component: Catalogo },
      { path: 'carrito', name: 'carrito', component: Carrito },
      { path: 'pedidos/:id', name: 'pedido-detalle', component: PedidoDetalle, props: true },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from, failure) => {
  if (failure) console.warn('Navegación no completada:', failure.type, to.path)
})

// Simulación del despliegue nuevo: compile, sirva dist/, abra la aplicación, borre
// dist/assets/tienda-base-*.js y haga clic en Tienda. El import() falla y entra aquí.
const MARCA = 'recarga.por.chunk.faltante'

router.onError((error, to) => {
  const esChunkPerdido =
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')

  if (!esChunkPerdido) return

  // La marca evita el bucle de recargas si el archivo de verdad ya no está en el servidor.
  if (sessionStorage.getItem(MARCA) === to.fullPath) {
    console.error('El módulo sigue sin estar disponible:', to.fullPath)
    return
  }

  sessionStorage.setItem(MARCA, to.fullPath)
  window.location.href = to.fullPath
})

// Al completar una navegación se limpia la marca: la versión nueva quedó cargada.
router.afterEach((to, from, failure) => {
  if (!failure && sessionStorage.getItem(MARCA) === to.fullPath) {
    sessionStorage.removeItem(MARCA)
  }
})

export default router
