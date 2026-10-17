<script setup>
defineProps({ taskId: { type: String, required: true } }) // llega desde :taskId gracias a props: true
</script>

<template>
  <h2>Detalle de tarea</h2>
  <p>Tarea recibida desde la dirección: <strong>{{ taskId }}</strong></p>
</template>
