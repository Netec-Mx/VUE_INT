// Única puerta de salida del módulo pedidos.
export { default as ListaPedidos } from './components/ListaPedidos.vue'

export const routes = [
  {
    path: '/pedidos',
    component: () => import('./components/ListaPedidos.vue')
  }
]
