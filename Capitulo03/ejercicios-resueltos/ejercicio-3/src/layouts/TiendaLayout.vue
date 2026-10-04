<script setup>
// Viaja en el chunk tienda-base junto con catálogo y carrito.
</script>

<template>
  <div class="tienda">
    <header>
      <h1>Tienda</h1>
      <nav>
        <RouterLink :to="{ name: 'catalogo' }">Catálogo</RouterLink>
        <RouterLink :to="{ name: 'carrito' }">Carrito</RouterLink>
        <RouterLink :to="{ name: 'pedido-detalle', params: { id: '1' } }">Pedido 1</RouterLink>
      </nav>
    </header>

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
