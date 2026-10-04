import { defineStore } from 'pinia'
import { api } from '../api.js'

// Ejercicio 2: store corregido.
//
// Versión rota que se recibió:
//   export const useUserStore = defineStore('user', {
//     state: { nombre: '', pedidos: [], loading: false },
//     getters: { total: () => this.pedidos.length },
//     actions: {
//       async cargar() {
//         this.loading = true
//         this.pedidos = await api.getPedidos()
//         this.loading = false
//       },
//     },
//   })
//
// Los tres defectos y su corrección:
//   1. "state" era un objeto literal: todas las instancias compartían la misma
//      referencia y en SSR el estado de un usuario se filtraba al siguiente.
//      Corrección: state es una función que retorna el objeto inicial.
//   2. El getter "total" era una arrow function que usaba "this", que ahí no
//      apunta al store, así que lanzaba TypeError.
//      Corrección: recibir el parámetro state (o escribir una función normal).
//   3. La petición no tenía try/catch/finally: si la API fallaba, la excepción
//      cortaba la action y "loading" se quedaba en true para siempre.
//      Corrección: finally apaga la bandera y catch guarda y relanza el error.
export const useUserStore = defineStore('user', {
  state: () => ({ nombre: '', pedidos: [], loading: false, error: null }),

  getters: {
    total: (state) => state.pedidos.length,
    // Variante con función normal, equivalente y también válida.
    valorAcumulado() {
      return this.pedidos.reduce((suma, pedido) => suma + pedido.valor, 0)
    },
  },

  actions: {
    async cargar() {
      this.loading = true
      this.error = null
      try {
        this.pedidos = await api.getPedidos()
      } catch (e) {
        this.error = e.message ?? 'No se pudieron cargar los pedidos'
        throw e // Se relanza para que $onAction y quien llamó se enteren.
      } finally {
        this.loading = false // Pase lo que pase, el spinner se apaga.
      }
    },
  },
})
