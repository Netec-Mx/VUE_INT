import { ref, watchEffect, toValue } from 'vue'
import { api } from '../api'

// Traduce la falla de Axios a la forma estable del proyecto.
function traducirError(fallo) {
  if (fallo.code === 'ERR_CANCELED') return { tipo: 'cancelado', mensaje: 'Cancelado' }
  if (fallo.code === 'ECONNABORTED') return { tipo: 'red', mensaje: 'El servidor tardó demasiado' }
  if (!fallo.response) return { tipo: 'red', mensaje: 'Sin conexión con el servidor' }
  if ([401, 403].includes(fallo.response.status)) return { tipo: 'auth', mensaje: 'Sesión vencida' }
  return { tipo: 'servidor', mensaje: 'Error del servidor', estado: fallo.response.status }
}

// El argumento se acepta como valor, ref o getter: toValue normaliza los tres casos.
export function useProducto(id) {
  const datos = ref(null)
  const cargando = ref(false)
  const error = ref(null)

  watchEffect((alLimpiar) => {
    // toValue va dentro del watchEffect: así el efecto rastrea el ref o el getter y reacciona.
    const identificador = toValue(id)

    const control = new AbortController()
    alLimpiar(() => control.abort())

    cargando.value = true
    error.value = null

    api.get(`/posts/${identificador}`, { signal: control.signal })
      .then((respuesta) => { datos.value = respuesta.data })
      .catch((fallo) => {
        const problema = traducirError(fallo)
        if (problema.tipo !== 'cancelado') error.value = problema
      })
      .finally(() => { cargando.value = false })
  })

  // Objeto plano con refs: sobrevive a la desestructuración sin perder reactividad.
  return { datos, cargando, error }
}
