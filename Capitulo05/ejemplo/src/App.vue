<script setup>
import { computed, ref } from 'vue'
import { useRecurso } from './composables/useRecurso'

const recursoElegido = ref('/posts')
const ruta = computed(() => `${recursoElegido.value}?_limit=5`)

const { datos, cargando, error } = useRecurso(ruta)
</script>

<template>
  <main>
    <h1>Composable REST con carga y error</h1>

    <label>
      Recurso:
      <select v-model="recursoElegido">
        <option value="/posts">Publicaciones</option>
        <option value="/users">Usuarios</option>
        <option value="/no-existe">Ruta inexistente (fuerza error 404)</option>
      </select>
    </label>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error" role="alert">{{ error.mensaje }} ({{ error.tipo }})</p>
    <ul v-else-if="datos">
      <li v-for="item in datos" :key="item.id">{{ item.title ?? item.name }}</li>
    </ul>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
}
[role='alert'] {
  color: #b00020;
}
</style>
