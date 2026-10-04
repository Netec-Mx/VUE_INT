<script setup>
// Vista ligera y siempre visible: se queda en el chunk de entrada a propósito.
const resumen = [
  { titulo: 'Pedidos del día', valor: 128 },
  { titulo: 'Pendientes por despachar', valor: 31 },
  { titulo: 'Devoluciones', valor: 4 }
]
</script>

<template>
  <section>
    <h2>Inicio</h2>
    <ul>
      <li v-for="dato in resumen" :key="dato.titulo">{{ dato.titulo }}: {{ dato.valor }}</li>
    </ul>
  </section>
</template>
