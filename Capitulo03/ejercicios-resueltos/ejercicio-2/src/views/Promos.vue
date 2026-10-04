<script setup>
// Ruta exclusiva de visitantes: quien tiene sesión nunca llega aquí, lo desvía el guard.
const promociones = [
  { codigo: 'BIENVENIDA10', detalle: '10 % en la primera compra' },
  { codigo: 'ENVIOGRATIS', detalle: 'Envío sin costo sobre 80.000' },
]
</script>

<template>
  <section>
    <h2>Promociones para visitantes</h2>
    <ul>
      <li v-for="p in promociones" :key="p.codigo">
        <strong>{{ p.codigo }}</strong> - {{ p.detalle }}
      </li>
    </ul>
  </section>
</template>
