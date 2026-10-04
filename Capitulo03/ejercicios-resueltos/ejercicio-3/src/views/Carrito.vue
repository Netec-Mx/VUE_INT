<script setup>
import { computed, ref } from 'vue'
import { productos } from '../datos'

const lineas = ref(productos.map((p) => ({ ...p, cantidad: 1 })))
const total = computed(() => lineas.value.reduce((s, l) => s + l.precio * l.cantidad, 0))
</script>

<template>
  <section>
    <h2>Carrito</h2>
    <ul>
      <li v-for="l in lineas" :key="l.id">
        {{ l.nombre }}
        <input v-model.number="l.cantidad" type="number" min="0" />
      </li>
    </ul>
    <p>Total: {{ total.toLocaleString('es-CO') }}</p>
  </section>
</template>
