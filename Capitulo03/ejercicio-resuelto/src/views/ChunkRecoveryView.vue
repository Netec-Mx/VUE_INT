<script setup>
import { useRoute } from 'vue-router'                // para leer ?target= de la dirección

const route = useRoute()                             // la ruta actual

function recargar() {                                // acción del botón Recargar
  const destino = String(route.query.target || '/')  // la página que no se pudo abrir
  const url = new URL(destino, window.location.origin)  // dirección completa, como la entiende el navegador
  const interno = url.origin === window.location.origin // solo direcciones de esta aplicación
  window.location.assign(interno ? url.pathname + url.search + url.hash : '/') // recarga completa: trae la versión publicada
}
</script>

<template>
  <main>
    <h1>No se pudo cargar esta parte de la aplicación</h1>
    <p>Puede que se haya publicado una versión nueva. Recarga para traerla.</p>
    <button type="button" @click="recargar">Recargar</button>
  </main>
</template>
