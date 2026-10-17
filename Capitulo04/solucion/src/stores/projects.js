import { defineStore } from 'pinia'                  // crea tiendas
import { computed, ref } from 'vue'                  // piezas del capítulo 1
import { api } from '../api.js'                      // API simulada
import { useApiStatusStore } from './apiStatus.js'   // carga y errores en un solo lugar

export const useProjectsStore = defineStore('projects', () => {
  const byId = ref({})                               // normalizado: cada proyecto UNA vez, por su id
  const allIds = ref([])                             // el orden de la lista, solo con los id
  const status = ref('idle')                         // semáforo: idle, loading, success o error
  const list = computed(() => allIds.value.map((id) => byId.value[id])) // getter: la lista en orden

  async function loadAll(fail = false) {             // fail = true simula un error del servidor
    status.value = 'loading'                         // semáforo: cargando
    try {
      const projects = await useApiStatusStore().track('cargar proyectos', () => api.getProjects(fail))
      byId.value = Object.fromEntries(projects.map((p) => [p.id, p])) // { p1: {...}, p2: {...} }
      allIds.value = projects.map((p) => p.id)       // ['p1', 'p2']
      status.value = 'success'                       // semáforo: listo
    } catch {
      status.value = 'error'                         // semáforo: falló (el aviso ya lo dio apiStatus)
    }
  }

  return { byId, allIds, status, list, loadAll }
})
