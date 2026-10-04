import { ref, onMounted, onUnmounted } from 'vue'

// Paso 5 del laboratorio.
// Salidas: { enLinea }. Los listeners se registran en onMounted (compatible con SSR)
// y se retiran en onUnmounted: cada addEventListener tiene su removeEventListener.
export function useEstadoRed() {
  const enLinea = ref(true)

  function marcarEnLinea() { enLinea.value = true }
  function marcarSinConexion() { enLinea.value = false }

  onMounted(() => {
    enLinea.value = navigator.onLine
    window.addEventListener('online', marcarEnLinea)
    window.addEventListener('offline', marcarSinConexion)
  })

  onUnmounted(() => {
    window.removeEventListener('online', marcarEnLinea)
    window.removeEventListener('offline', marcarSinConexion)
  })

  return { enLinea }
}
