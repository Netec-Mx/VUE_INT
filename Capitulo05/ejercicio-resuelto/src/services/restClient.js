// src/services/restClient.js: el único lugar que habla REST
import axios from 'axios'                            // la librería HTTP
import { normalizeRestError } from './appError'      // el traductor de errores

const restClient = axios.create({                    // una instancia propia, no el axios global
  baseURL: import.meta.env.VITE_API_URL,             // '/api', leído del archivo .env
  timeout: 8000                                      // 8 segundos sin respuesta = timeout
})

// Interceptor de petición: corre antes de que salga cada una
restClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') // el token guardado al iniciar sesión
  if (token) config.headers.Authorization = `Bearer ${token}`   // lo adjunta en la cabecera
  return config                                      // sin esto, la petición no sale
})

// Interceptor de respuesta: todo fallo sale como AppError
restClient.interceptors.response.use(
  (response) => response,                            // bien: pasa sin tocarla
  (error) => Promise.reject(normalizeRestError(error))   // falla: la traduce
)

export async function getProjects() {               // GET /api/projects
  const response = await restClient.get('/projects')
  return response.data.data                          // el servidor envuelve la lista en data
}

export async function createTask(task) {            // POST /api/tasks
  const response = await restClient.post('/tasks', task)
  return response.data.data                          // la tarea creada
}
