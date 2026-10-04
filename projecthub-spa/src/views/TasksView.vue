<template>
  <div class="card">
    <h2>Tablero de Tareas (Pinia + Composition API)</h2>
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center;">
      <select v-model="taskStore.filter">
        <option value="todas">Todas las tareas</option>
        <option value="pendientes">Pendientes</option>
        <option value="completadas">Completadas</option>
      </select>
      <input v-model="newTitle" placeholder="Nueva tarea..." @keyup.enter="handleCreate" style="flex: 1;" />
      <button @click="handleCreate">Agregar</button>
    </div>
    <ul style="list-style: none; padding: 0;">
      <li v-for="t in taskStore.filteredTasks" :key="t.id" style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 1rem;">
        <input type="checkbox" :checked="t.completed" @change="taskStore.toggleTask(t.id)" />
        <span :style="{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#94a3b8' : '#0f172a' }">
          {{ t.title }}
        </span>
        <span class="badge" style="margin-left: auto; background: #e0f2fe; color: #0369a1;">Prioridad: {{ t.priority }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
const newTitle = ref('')

function handleCreate() {
  if (newTitle.value.trim()) {
    taskStore.addTask(newTitle.value.trim())
    newTitle.value = ''
  }
}
</script>
