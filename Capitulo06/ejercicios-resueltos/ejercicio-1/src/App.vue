<script setup>
// El App solo pinta la navegación y el contenedor donde el enrutador monta cada vista.
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>Tablero de la distribuidora</h1>

  <nav>
    <RouterLink to="/">Inicio</RouterLink> |
    <RouterLink to="/pedidos">Pedidos</RouterLink> |
    <RouterLink to="/reportes">Reportes</RouterLink> |
    <RouterLink to="/admin">Administración</RouterLink>
  </nav>

  <p>
    Abra la pestaña Network del navegador y navegue a Reportes: el archivo .js de esa vista
    se pide en ese instante, no al cargar la aplicación.
  </p>

  <RouterView />
</template>
