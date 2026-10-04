import axios from 'axios'

// Sustituye al servidor real: cada ruta reproduce uno de los escenarios de falla del capítulo.
// Así el ejercicio se puede comprobar sin apagar ningún backend.
const respuestas = {
  '/productos': { estado: 200, cuerpo: [{ id: 42, nombre: 'Café Sierra Nevada', precio: 18000 }] },
  '/privado': { estado: 401, cuerpo: { mensaje: 'token vencido' } },
  '/guardar': { estado: 422, cuerpo: { errors: { precio: 'debe ser mayor que cero' } } },
  '/roto': { estado: 500, cuerpo: { mensaje: 'fallo interno' } }
}

function fallaDeRed(config) {
  return new axios.AxiosError('Network Error', 'ERR_NETWORK', config, {})
}

function respuestaHttp(config, escenario) {
  return {
    data: escenario.cuerpo,
    status: escenario.estado,
    statusText: String(escenario.estado),
    headers: {},
    config
  }
}

export function adaptadorSimulado(config) {
  return new Promise((resolver, rechazar) => {
    const cancelar = () => rechazar(new axios.CanceledError(null, config))

    if (config.signal?.aborted) return cancelar()
    config.signal?.addEventListener('abort', cancelar, { once: true })

    const temporizador = setTimeout(() => {
      // El backend apagado no devuelve respuesta: no hay fallo.response y el tipo queda en 'red'.
      if (config.url === '/apagado') return rechazar(fallaDeRed(config))

      const escenario = respuestas[config.url] ?? { estado: 404, cuerpo: { mensaje: 'no existe' } }
      const respuesta = respuestaHttp(config, escenario)

      if (escenario.estado >= 200 && escenario.estado < 300) return resolver(respuesta)

      rechazar(
        new axios.AxiosError(
          `Request failed with status code ${escenario.estado}`,
          'ERR_BAD_RESPONSE',
          config,
          {},
          respuesta
        )
      )
    }, 400)

    config.signal?.addEventListener('abort', () => clearTimeout(temporizador), { once: true })
  })
}
