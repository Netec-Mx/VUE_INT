import { shallowRef, ref, computed } from 'vue'

export function useProjects() {
  // shallowRef para evitar envolver deep reactivity en listas inmutables de proyectos
  const projects = shallowRef([
    { id: 101, name: 'Portal de Clientes Vue 3', status: 'Activo', tasksCount: 14 },
    { id: 102, name: 'App Móvil Híbrida', status: 'En Progreso', tasksCount: 8 },
    { id: 103, name: 'Servicio GraphQL y Microfrontends', status: 'Planeación', tasksCount: 22 }
  ])

  const searchQuery = ref('')

  const filteredProjects = computed(() => {
    if (!searchQuery.value.trim()) return projects.value
    const q = searchQuery.value.toLowerCase()
    return projects.value.filter(p => p.name.toLowerCase().includes(q))
  })

  return { projects, searchQuery, filteredProjects }
}
