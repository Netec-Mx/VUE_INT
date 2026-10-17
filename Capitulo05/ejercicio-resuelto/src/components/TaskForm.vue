<!-- src/components/TaskForm.vue: crea una tarea y muestra el 422 junto al campo -->
<script setup>
import { ref } from 'vue'
import { useProjectsStore } from '../stores/projects'

const store = useProjectsStore()
const title = ref('')                                // lo que escribe la persona
const titleError = ref('')                           // mensaje debajo del campo

async function submit() {
  titleError.value = ''                              // limpia el error anterior
  try {
    await store.addTask(title.value)                 // la tienda llama al servicio REST
    title.value = ''                                 // éxito: vacía el campo
  } catch (error) {
    // Decide con type: solo la validación se queda junto al campo
    if (error.type === 'validation') titleError.value = error.details?.title?.[0] ?? error.message
  }
}
</script>

<template>
  <!-- .prevent: evita que el navegador recargue la página al enviar -->
  <form @submit.prevent="submit">
    <label for="task-title">Nueva tarea</label>
    <input id="task-title" v-model="title" :aria-invalid="Boolean(titleError)" />
    <button type="submit">Crear tarea</button>
    <p v-if="titleError" role="alert">{{ titleError }}</p>
  </form>
</template>
