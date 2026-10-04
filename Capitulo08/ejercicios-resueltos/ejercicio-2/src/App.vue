<script setup>
import PieDeApp from './components/PieDeApp.vue'

const nombre = import.meta.env.VITE_APP_NOMBRE
</script>

<template>
  <main>
    <h1>{{ nombre }}</h1>
    <p>
      El pie muestra el valor de <code>VITE_ENTORNO</code> que el modo de compilación inyectó.
      Cambia según el modo con el que se haya compilado esta carpeta.
    </p>
    <p class="nota">
      El texto de la página no nombra ningún entorno a propósito: así el único origen posible
      de esa palabra dentro del bundle es la variable, y la verificación con
      <code>grep</code> mide lo que debe medir.
    </p>
    <PieDeApp />
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
}
.nota {
  color: #475569;
  font-size: 0.9rem;
}
</style>
