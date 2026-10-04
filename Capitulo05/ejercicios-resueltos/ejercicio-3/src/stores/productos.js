import { defineStore } from 'pinia'
import { obtenerDestacados, guardarPrecio } from '../api'

// Store normalizado: las entidades viven una sola vez en `porId`.
// Las listas guardan únicamente identificadores, nunca copias del objeto.
export const useProductos = defineStore('productos', {
  state: () => ({
    porId: {},
    listas: {},
    consultadoEn: {}
  }),

  getters: {
    destacados: (estado) => (estado.listas.destacados ?? []).map((id) => estado.porId[id])
  },

  actions: {
    guardar(entidades) {
      for (const entidad of entidades) {
        this.porId[entidad.id] = { ...this.porId[entidad.id], ...entidad }
      }
    },

    // Ventana de frescura: dentro del minuto no se vuelve a pedir la lista.
    async cargarDestacados() {
      const marca = this.consultadoEn.destacados
      if (marca && Date.now() - marca < 60000) return

      const entidades = await obtenerDestacados()
      this.guardar(entidades)
      this.listas.destacados = entidades.map((entidad) => entidad.id)
      this.consultadoEn.destacados = Date.now()
    },

    // Al guardar se actualiza la entidad en un solo sitio.
    // El listado y el panel leen del getter, así que los dos cambian sin pedir la lista otra vez.
    async cambiarPrecio(id, precio) {
      const entidad = await guardarPrecio(id, precio)
      this.guardar([entidad])
    }
  }
})
