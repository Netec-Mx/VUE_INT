// Traemos de Vue las tres herramientas que necesitamos para manejar datos que cambian.
import { ref, watchEffect, toValue } from 'vue'
// Traemos la librería Axios, que es la que sabe hablar con un servidor por internet.
import axios from 'axios'

// Creamos un "mensajero" propio, ya configurado, para no repetir la configuración en cada llamada.
const api = axios.create({
  // Dirección base del servidor: todas las rutas se cuelgan de aquí.
  baseURL: 'https://jsonplaceholder.typicode.com',
  // Si el servidor no contesta en 10 segundos, damos la petición por perdida.
  timeout: 10000
})

// Esta función convierte cualquier falla de Axios en un mensaje claro y corto.
function traducirError(fallo) {
  // Si la petición se canceló a propósito, avisamos con esa palabra exacta.
  if (fallo.code === 'ERR_CANCELED') return { tipo: 'cancelado', mensaje: 'Cancelado' }
  // Si el servidor no alcanzó a responder a tiempo, lo decimos así.
  if (fallo.code === 'ECONNABORTED') return { tipo: 'red', mensaje: 'El servidor tardó demasiado' }
  // Si no llegó ninguna respuesta, casi siempre es que no hay conexión.
  if (!fallo.response) return { tipo: 'red', mensaje: 'Sin conexión con el servidor' }
  // Si llegó respuesta pero con código 401 o 403, la sesión ya no es válida.
  if ([401, 403].includes(fallo.response.status)) return { tipo: 'auth', mensaje: 'Sesión vencida' }
  // Cualquier otro caso lo tratamos como un problema del lado del servidor.
  return { tipo: 'servidor', mensaje: 'Error del servidor', estado: fallo.response.status }
}

// Esta es la función reutilizable: le damos una ruta y nos devuelve los datos y su estado.
export function useRecurso(ruta) {
  // Aquí se guardarán los datos cuando lleguen; arranca vacío.
  const datos = ref(null)
  // Aquí marcamos si en este momento estamos esperando respuesta.
  const cargando = ref(false)
  // Aquí se guardará el problema, si algo sale mal.
  const error = ref(null)

  // watchEffect corre esto de una vez, y lo vuelve a correr si la ruta cambia.
  watchEffect((alLimpiar) => {
    // Creamos un control que nos permite cancelar esta petición si hace falta.
    const control = new AbortController()
    // Si la ruta cambia o el componente se cierra, cancelamos la petición vieja.
    alLimpiar(() => control.abort())

    // Encendemos el indicador de que estamos esperando.
    cargando.value = true
    // Borramos cualquier error anterior para empezar limpio.
    error.value = null

    // Pedimos los datos al servidor; toValue lee la ruta sin importar cómo nos la entregaron.
    api.get(toValue(ruta), { signal: control.signal })
      // Si todo salió bien, guardamos el contenido de la respuesta.
      .then((respuesta) => { datos.value = respuesta.data })
      // Si falló, traducimos el problema y lo guardamos, salvo que haya sido una cancelación.
      .catch((fallo) => {
        // Traducimos la falla a nuestro formato sencillo.
        const problema = traducirError(fallo)
        // Una cancelación no es un error de verdad, así que no la mostramos.
        if (problema.tipo !== 'cancelado') error.value = problema
      })
      // Pase lo que pase, apagamos el indicador de espera.
      .finally(() => { cargando.value = false })
  })

  // Devolvemos las tres piezas para que el componente las use en su plantilla.
  return { datos, cargando, error }
}
