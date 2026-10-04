import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([
    { id: 1, title: 'Optimizar renderizado en SPA', completed: true, priority: 'alta', projectId: 101 },
    { id: 2, title: 'Refactorizar composables reutilizables', completed: false, priority: 'alta', projectId: 101 },
    { id: 3, title: 'Configurar guards de navegación', completed: false, priority: 'media', projectId: 102 },
    { id: 4, title: 'Normalizar stores con Pinia', completed: false, priority: 'media', projectId: 102 },
    { id: 5, title: 'Integrar Apollo Client y caché', completed: false, priority: 'baja', projectId: 103 }
  ])

  const filter = ref('todas')

  const filteredTasks = computed(() => {
    if (filter.value === 'completadas') return tasks.value.filter(t => t.completed)
    if (filter.value === 'pendientes') return tasks.value.filter(t => !t.completed)
    return tasks.value
  })

  function toggleTask(id) {
    const t = tasks.value.find(item => item.id === id)
    if (t) t.completed = !t.completed
  }

  function addTask(title, priority = 'media', projectId = 101) {
    tasks.value.push({
      id: Date.now(),
      title,
      completed: false,
      priority,
      projectId
    })
  }

  return { tasks, filter, filteredTasks, toggleTask, addTask }
})
