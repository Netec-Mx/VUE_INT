<script setup>
import { onMounted } from 'vue'                            // ciclo de vida (capítulo 1)
import { storeToRefs } from 'pinia'                        // lo que se lee, con storeToRefs
import { useApiStatusStore } from '@/stores/apiStatus.js'  // carga y errores
import { useProjectsStore } from '@/stores/projects.js'    // proyectos
import { useTasksStore } from '@/stores/tasks.js'          // tareas
import { useUiStore } from '@/stores/ui.js'                // tema, filtro y avisos

const projects = useProjectsStore()                        // cada tienda, una vez
const tasks = useTasksStore()
const ui = useUiStore()
const { list, status } = storeToRefs(projects)             // datos y getters: conectados
const { filter, toast } = storeToRefs(ui)
const { isBusy, errors } = storeToRefs(useApiStatusStore())

onMounted(() => {                                          // al aparecer la vista...
  projects.loadAll()                                       // ...pide los proyectos
  tasks.loadAll()                                          // ...y las tareas
})
</script>

<template>
  <section>
    <p>
      <button type="button" @click="ui.toggleTheme()">Cambiar tema</button>
      <label>
        Mostrar
        <select v-model="filter">
          <option value="todas">Todas</option>
          <option value="pendientes">Pendientes</option>
          <option value="hechas">Hechas</option>
        </select>
      </label>
      <button type="button" @click="projects.loadAll(true)">Simular error</button>
    </p>
    <p>
      Semáforo de proyectos: <strong>{{ status }}</strong>
      <span v-if="isBusy">(cargando...)</span>
      - Errores registrados: {{ errors.length }}
    </p>
    <p v-if="toast" role="alert">
      {{ toast }}
      <button type="button" @click="ui.notify('')">Cerrar aviso</button>
    </p>
    <h2>Proyectos ({{ tasks.pendingCount }} tareas pendientes)</h2>
    <article v-for="project in list" :key="project.id">
      <h3>{{ project.name }}</h3>
      <ul>
        <li v-for="task in tasks.forProject(project.id)" :key="task.id">
          <label>
            <input type="checkbox" :checked="task.done" @change="tasks.toggleDone(task.id)" />
            {{ task.title }}
          </label>
        </li>
      </ul>
    </article>
  </section>
</template>
