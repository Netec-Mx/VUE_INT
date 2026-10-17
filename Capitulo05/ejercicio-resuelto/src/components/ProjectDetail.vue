<!-- src/components/ProjectDetail.vue: el proyecto abierto y la caché de Apollo -->
<script setup>
import { useProjectsStore } from '../stores/projects'
import TaskForm from './TaskForm.vue'

const store = useProjectsStore()                     // la misma tienda que usa App.vue
</script>

<template>
  <!-- solo aparece cuando hay un proyecto abierto -->
  <section v-if="store.selected">
    <h2>{{ store.selected.name }}</h2>
    <ul>
      <li v-for="task in store.selected.tasks" :key="task.id">{{ task.title }}</li>
    </ul>
    <TaskForm />
    <h3>Caché de Apollo: {{ store.cacheEntries.length }} entradas</h3>
    <!-- cada clave es tipo:id, y ninguna se repite -->
    <p><code>{{ store.cacheEntries.join(' · ') }}</code></p>
  </section>
</template>
