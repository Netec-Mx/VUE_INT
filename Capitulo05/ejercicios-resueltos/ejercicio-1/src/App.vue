<script setup>
import { ref } from 'vue'
import ProductoAntes from './components/ProductoAntes.vue'
import ProductoDespues from './components/ProductoDespues.vue'

const id = ref(1)
</script>

<template>
  <main>
    <h1>Ejercicio 1 - Del componente al composable</h1>

    <p>
      Cambie el identificador y compare: la versión de abajo se actualiza sola, la de arriba no,
      porque su petición corrió una sola vez dentro de <code>onMounted</code>.
    </p>

    <label>
      Identificador:
      <input v-model.number="id" type="number" min="1" max="100" />
    </label>

    <ProductoAntes :id="id" />
    <ProductoDespues :id="id" />
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  max-width: 44rem;
  margin: 2rem auto;
}
section {
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
}
[role='alert'] {
  color: #b00020;
}
</style>
