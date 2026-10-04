<script setup>
import { productos } from '../datos'
</script>

<template>
  <section>
    <h2>Catálogo</h2>
    <ul>
      <li v-for="p in productos" :key="p.id">
        {{ p.nombre }} - {{ p.precio.toLocaleString('es-CO') }}
      </li>
    </ul>
  </section>
</template>
