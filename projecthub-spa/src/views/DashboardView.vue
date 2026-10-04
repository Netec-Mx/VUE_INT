<template>
  <div class="card">
    <h2>Panel General - ProjectHub SPA</h2>
    <p>Bienvenido al laboratorio central de Vue Intermedio (Capítulos 1 al 5).</p>
    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
      <div class="card" style="flex: 1; border-left: 4px solid #0284c7;">
        <h3>Proyectos Registrados</h3>
        <p style="font-size: 2rem; margin: 0; font-weight: bold;">3</p>
      </div>
      <div class="card" style="flex: 1; border-left: 4px solid #10b981;">
        <h3>Tareas en Seguimiento</h3>
        <p style="font-size: 2rem; margin: 0; font-weight: bold;">{{ taskStore.tasks.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks'
const taskStore = useTaskStore()
</script>
