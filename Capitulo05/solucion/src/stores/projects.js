// src/stores/projects.js: el estado de la pantalla; usa los servicios, nunca la red directa
import { defineStore } from 'pinia'                  // capítulo 4: tiendas de Pinia
import { ref } from 'vue'
import { getProjects, createTask } from '../services/restClient'
import { getProjectTasks, cacheKeys } from '../services/graphqlClient'

export const useProjectsStore = defineStore('projects', () => {   // tienda en forma de función
  const projects = ref([])                           // lista que llega por REST
  const notice = ref('')                             // aviso general para la persona
  const loggedIn = ref(Boolean(localStorage.getItem('access_token')))   // ¿hay token?

  function report(error) {                           // decide con type, no con el texto
    if (error.type !== 'validation') notice.value = error.message   // el 422 va junto al campo
  }

  async function loadProjects() {
    notice.value = ''                                // empieza sin aviso
    try {
      projects.value = await getProjects()           // REST con el token del interceptor
    } catch (error) {
      projects.value = []                            // sin datos que mostrar
      report(error)
    }
  }

  function login() {                                 // sesión simulada: guarda un token
    localStorage.setItem('access_token', 'demo-123')
    loggedIn.value = true
    loadProjects()
  }

  function logout() {                                // borra el token
    localStorage.removeItem('access_token')
    loggedIn.value = false
  }

  const selected = ref(null)                         // proyecto abierto, llega por GraphQL
  const cacheEntries = ref([])                       // lo que guarda Apollo

  async function openProject(projectId, force = false) {
    try {
      selected.value = await getProjectTasks(projectId, force)
      cacheEntries.value = cacheKeys()               // refresca la vista de la caché
    } catch (error) {
      report(error)
    }
  }

  async function addTask(title) {
    try {
      await createTask({ projectId: selected.value.id, title })   // REST: POST /api/tasks
      await openProject(selected.value.id, true)     // la caché quedó vieja: pide a la red
    } catch (error) {
      report(error)
      throw error                                    // el formulario decide qué mostrar
    }
  }

  return { projects, notice, loggedIn, loadProjects, login, logout,
    selected, cacheEntries, openProject, addTask }
})
