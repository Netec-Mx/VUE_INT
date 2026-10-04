<script setup>
// import.meta.env.VITE_ENTORNO se reemplaza por un literal al compilar.
// El build de producción nunca ve el valor del archivo .env.staging.
const entorno = import.meta.env.VITE_ENTORNO
const apiUrl = import.meta.env.VITE_API_URL
const commit = __APP_COMMIT__
</script>

<template>
  <footer>
    <span class="etiqueta" :data-entorno="entorno">{{ entorno }}</span>
    <span>API: {{ apiUrl }}</span>
    <span>Build: {{ commit }}</span>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  gap: 1rem;
  align-items: center;
  border-top: 1px solid #cbd5e1;
  margin-top: 2rem;
  padding-top: 0.75rem;
  font-size: 0.85rem;
  color: #475569;
}
.etiqueta {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}
</style>
