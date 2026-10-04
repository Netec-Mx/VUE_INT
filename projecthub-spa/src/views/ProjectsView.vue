<template>
  <div class="card">
    <h2>Gestión de Proyectos (Optimización con shallowRef)</h2>
    <input v-model="searchQuery" placeholder="Buscar proyecto..." style="width: 300px; margin-bottom: 1rem;" />
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="text-align: left; border-bottom: 2px solid #e2e8f0;">
          <th style="padding: 0.75rem;">ID</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Tareas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filteredProjects" :key="p.id" style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 0.75rem;">#{{ p.id }}</td>
          <td><strong>{{ p.name }}</strong></td>
          <td><span class="badge" style="background: #e2e8f0;">{{ p.status }}</span></td>
          <td>{{ p.tasksCount }} items</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useProjects } from '@/composables/useProjects'
const { searchQuery, filteredProjects } = useProjects()
</script>
