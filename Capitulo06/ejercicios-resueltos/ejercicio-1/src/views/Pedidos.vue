<script setup>
// Vista de tamaño medio: lista corta generada en memoria, sin dependencias externas.
import { ref, computed } from 'vue'

const busqueda = ref('')

const pedidos = []
for (let i = 1; i <= 200; i++) {
  pedidos.push({ id: i, cliente: `Cliente ${i}`, valor: 10000 + i * 137 })
}

const filtrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()
  if (!texto) return pedidos
  return pedidos.filter((p) => p.cliente.toLowerCase().includes(texto))
})
</script>

<template>
  <section>
    <h2>Pedidos</h2>
    <input v-model="busqueda" placeholder="Buscar cliente" />
    <p>{{ filtrados.length }} pedidos</p>
    <ul>
      <li v-for="pedido in filtrados.slice(0, 50)" :key="pedido.id">
        {{ pedido.cliente }} - {{ pedido.valor }}
      </li>
    </ul>
  </section>
</template>
