<script setup>
import { provide, readonly } from 'vue'                 // ofrecer datos y protegerlos de escritura
import { pedirTareas } from './datos.js'                // la carga simulada
import { useAsyncState } from './composables/useAsyncState.js'             // carga
import { useProjectFilters } from './composables/useProjectFilters.js'     // buscador
import { useTaskSelection } from './composables/useTaskSelection.js'       // selección
import { useLocalPreferences } from './composables/useLocalPreferences.js' // preferencia
import { projectHubKey } from './keys.js'               // la clave única del contexto
import TaskCollectionProvider from './TaskCollectionProvider.vue'         // el renderless

const { datos: tareas, cargando, error, recargar } = useAsyncState(pedirTareas, []) // datos: tareas la renombra
const { texto, soloPendientes, visibles, pendientes } = useProjectFilters(tareas)    // buscador
const { seleccionada, seleccionar } = useTaskSelection(tareas)                       // selección
const compacta = useLocalPreferences('vista-compacta')                               // preferencia guardada

provide(projectHubKey, {                                // ofrece a todos los componentes de abajo...
  visibles,                                             // ...la lista filtrada (un computed ya es de solo lectura)
  cargando: readonly(cargando),                         // ...la bandera, solo para leer
  error: readonly(error),                               // ...el mensaje, solo para leer
  seleccionar                                           // ...y la acción para elegir una tarea
})
</script>

<template>
  <section :class="{ compacta }">
    <h2>Después: Composition API</h2>
    <input v-model="texto" aria-label="Buscar tarea" placeholder="Buscar..." />
    <label><input type="checkbox" v-model="soloPendientes" /> Solo pendientes ({{ pendientes }})</label>
    <label><input type="checkbox" v-model="compacta" /> Vista compacta</label>
    <!-- El renderless entrega los datos; este componente decide cómo se ven -->
    <TaskCollectionProvider v-slot="{ lista, cargando, error, seleccionar }">
      <p v-if="cargando">Cargando...</p>
      <p v-else-if="error" role="alert">{{ error }}</p>
      <ul v-else>
        <li v-for="t in lista" :key="t.id">
          <button type="button" @click="seleccionar(t.id)">{{ t.hecha ? '✔' : '○' }} {{ t.titulo }}</button>
        </li>
      </ul>
    </TaskCollectionProvider>
    <p>Seleccionada: {{ seleccionada?.titulo ?? 'ninguna' }}</p>
    <button type="button" @click="recargar">Recargar</button>
  </section>
</template>
