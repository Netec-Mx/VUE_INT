<script setup>
import { precargarTienda } from './router'

// El chunk se pide en el hover, no en el clic: cuando el usuario suelta el botón ya llegó.
function alApuntar() {
  precargarTienda()
}
</script>

<template>
  <div>
    <nav class="principal">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/tienda" @mouseenter="alApuntar" @focus="alApuntar">Tienda</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 1.5rem;
}
.principal a {
  margin-right: 1rem;
}
</style>
