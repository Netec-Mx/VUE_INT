<script setup>
import { ListaPedidos } from '@/modules/pedidos'
import { ListaClientes } from '@/modules/clientes'
</script>

<template>
  <main>
    <h1>Frontera entre módulos</h1>
    <p>
      Pedidos consume clientes únicamente por el <code>index.js</code> del módulo. La regla
      <code>no-restricted-imports</code> de <code>eslint.config.js</code> rechaza cualquier
      otra ruta.
    </p>
    <div class="columnas">
      <ListaPedidos />
      <ListaClientes />
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  max-width: 60rem;
  margin: 0 auto;
  padding: 1.5rem;
}
.columnas {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}
</style>
