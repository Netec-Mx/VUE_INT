import axios from 'axios'
import { adaptadorSimulado } from './adaptadorSimulado'
import { normalizarError } from './errores'

// Una sola instancia por API, con baseURL y timeout. Nunca se usa el axios global.
export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  // El adaptador simulado reemplaza al servidor para poder comprobar los cinco escenarios.
  adapter: adaptadorSimulado
})

function leerToken() {
  return window.localStorage.getItem('token') ?? 'token-de-demostración'
}

// Interceptor de petición: el token se lee en cada llamada, no al crear la instancia.
api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${leerToken()}`
    return config
  },
  (fallo) => Promise.reject(fallo)
)

// Interceptor de respuesta: único punto donde una falla cruda se vuelve ErrorApi.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (fallo) => Promise.reject(normalizarError(fallo))
)
