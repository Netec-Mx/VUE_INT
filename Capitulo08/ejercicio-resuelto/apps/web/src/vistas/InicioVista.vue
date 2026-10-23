<script setup>
// Lanza un error para comprobar en el paso 3 que la observabilidad lo registra
function simularError() {
  throw new Error('Error de prueba desde Inicio')
}
</script>

<template>
  <h2>Inicio</h2>
  <button type="button" @click="simularError">Simular error</button>
</template>
