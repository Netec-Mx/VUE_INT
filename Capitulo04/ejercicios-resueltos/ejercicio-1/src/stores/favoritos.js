import { defineStore } from 'pinia'

// Ejercicio 1: migración del módulo de Vuex "favoritos" a un store de Pinia.
//
// Módulo original de Vuex (queda aquí solo como referencia de lo que se migró):
//   export default {
//     namespaced: true,
//     state: { favoritos: [] },
//     getters: { cantidad: (state) => state.favoritos.length },
//     mutations: { AGREGAR(state, id) { state.favoritos.push(id) } },
//     actions: { agregar({ commit }, id) { commit('AGREGAR', id) } },
//   }
//
// Qué cambió y por qué:
//   1. "namespaced: true" desaparece: el aislamiento lo da el id 'favoritos'.
//   2. "state" pasa de objeto literal a función, para que cada instancia de la
//      aplicación tenga su propia copia (indispensable en SSR).
//   3. La mutation AGREGAR desaparece: en Pinia la action escribe directo en this.
//   4. La action pierde el primer argumento "context"; ya no hay commit.
export const useFavoritosStore = defineStore('favoritos', {
  state: () => ({ favoritos: [] }),

  getters: {
    cantidad: (state) => state.favoritos.length,
    // Getter con argumento: retorna una función y por eso pierde el cacheo.
    esFavorito: (state) => (id) => state.favoritos.includes(id),
  },

  actions: {
    // Sin context y sin commit: la action modifica el state con this.
    agregar(id) {
      if (this.favoritos.includes(id)) return
      this.favoritos.push(id)
    },

    quitar(id) {
      this.favoritos = this.favoritos.filter((favorito) => favorito !== id)
    },

    // $reset viene de fábrica en los option stores.
    limpiar() {
      this.$reset()
    },
  },
})
