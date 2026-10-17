import { defineStore } from 'pinia'          // crea tiendas
import { ref, watch } from 'vue'             // piezas del capítulo 1

export const useUiStore = defineStore('ui', () => {
  const theme = ref('light')                 // preferencia: 'light' u 'dark'
  const filter = ref('todas')                // preferencia: 'todas', 'pendientes' o 'hechas'
  const toast = ref('')                      // aviso momentáneo: NO se guarda

  function toggleTheme() {                   // action: alterna claro y oscuro
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function notify(message) {                 // action: muestra (o borra, con '') un aviso
    toast.value = message
  }

  // efecto secundario: cada vez que cambia el tema, lo aplica a la página
  watch(theme, (value) => { document.documentElement.dataset.theme = value }, { immediate: true })

  return { theme, filter, toast, toggleTheme, notify }
}, {
  persist: { key: 'projecthub:ui:v1', paths: ['theme', 'filter'] } // toast queda fuera a propósito
})
