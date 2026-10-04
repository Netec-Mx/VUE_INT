import { defineStore } from 'pinia'

// Store con expiración: lo guardado en localStorage solo se rehidrata si
// pasaron menos de cinco segundos desde la última escritura.
export const EXPIRA_EN = 5000

export const useBorradorStore = defineStore('borrador', {
  expiraEn: EXPIRA_EN, // Opción propia que lee expiracionPlugin.
  state: () => ({ titulo: '', lineas: [] }),
  getters: {
    cantidad: (state) => state.lineas.length,
  },
  actions: {
    agregarLinea(texto) {
      const limpio = String(texto).trim()
      if (!limpio) return
      this.lineas.push({ id: Date.now(), texto: limpio })
    },
    vaciar() {
      this.$reset()
    },
  },
})
