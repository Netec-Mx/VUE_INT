<script setup>
import { onMounted } from 'vue'

// Se monta una sola vez: al pasar de /tienda/pedidos/1 a /tienda/pedidos/2 el layout se reutiliza.
onMounted(() => console.info('TiendaLayout montado una sola vez'))
</script>

<template>
  <div class="tienda">
    <header>
      <h1>Tienda</h1>
      <nav>
        <RouterLink :to="{ name: 'catalogo' }">Catálogo</RouterLink>
        <RouterLink :to="{ name: 'carrito' }">Carrito</RouterLink>
        <RouterLink :to="{ name: 'pedido-detalle', params: { id: 1 } }">Pedido 1</RouterLink>
        <RouterLink :to="{ name: 'pedido-detalle', params: { id: 2 } }">Pedido 2</RouterLink>
      </nav>
    </header>

    <!-- Cada nivel de children necesita su propio RouterView en el padre. -->
    <main><RouterView /></main>
  </div>
</template>

<style scoped>
nav a {
  margin-right: 1rem;
}
main {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
</style>
