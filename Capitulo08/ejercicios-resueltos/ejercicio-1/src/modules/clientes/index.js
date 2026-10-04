// Única puerta de salida del módulo clientes.
// Todo lo que otro módulo puede usar se exporta aquí; lo demás es interno.
export { default as ListaClientes } from './components/ListaClientes.vue'
export { useClientes } from './composables/useClientes.js'

export const routes = [
  {
    path: '/clientes',
    component: () => import('./components/ListaClientes.vue')
  }
]
