import { ref, watchEffect, toValue } from 'vue'
import { consultar } from '../api.js'

// Paso 3 del laboratorio.
// Entradas: url como string, ref o getter (se normaliza con toValue()).
// Salidas: { data, error, cargando } como refs dentro de un objeto plano.
// Limpieza: la bandera "vigente" descarta la respuesta de una URL ya reemplazada.
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const cargando = ref(false)

  watchEffect((onCleanup) => {
    let vigente = true
    onCleanup(() => { vigente = false })

    data.value = null
    error.value = null
    cargando.value = true

    consultar(toValue(url))
      .then((json) => { if (vigente) data.value = json })
      .catch((err) => { if (vigente) error.value = err })
      .finally(() => { if (vigente) cargando.value = false })
  })

  return { data, error, cargando }
}
