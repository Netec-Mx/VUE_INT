<script setup>
// Sin un solo if de acceso: si este componente se dibuja, es porque el guard ya autorizó.
const pedidos = [
  { id: 1, cliente: 'Tienda La Esquina', estado: 'despachado' },
  { id: 2, cliente: 'Supermercado El Trigal', estado: 'en alistamiento' },
  { id: 3, cliente: 'Minimercado Nueva Era', estado: 'pendiente' },
]
</script>

<template>
  <section>
    <h2>Pedidos (solo rol vendedor)</h2>
    <ul>
      <li v-for="p in pedidos" :key="p.id">
        <RouterLink :to="{ name: 'pedido-detalle', params: { id: String(p.id) } }">
          {{ p.cliente }}
        </RouterLink>
        - {{ p.estado }}
      </li>
    </ul>
  </section>
</template>
