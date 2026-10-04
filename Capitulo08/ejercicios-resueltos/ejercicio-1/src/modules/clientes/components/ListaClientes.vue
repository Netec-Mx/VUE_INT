<script setup>
import { useClientes } from '../composables/useClientes.js'

const { clientes, total } = useClientes()
</script>

<template>
  <section class="modulo">
    <h2>Clientes ({{ total }})</h2>
    <ul>
      <li v-for="cliente in clientes" :key="cliente.id">
        {{ cliente.nombre }} - {{ cliente.ciudad }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.modulo {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 1rem;
}
</style>
