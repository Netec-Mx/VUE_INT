import { defineStore } from 'pinia'

// Store de control: NO declara expiraEn, así que el plugin lo ignora por
// completo y no escribe nada en localStorage. Sirve para comprobar que el
// comportamiento anterior se mantiene sin cambios.
export const usePreferenciasStore = defineStore('preferencias', {
  state: () => ({ tema: 'claro' }),
  actions: {
    alternarTema() {
      this.tema = this.tema === 'claro' ? 'oscuro' : 'claro'
    },
  },
})
