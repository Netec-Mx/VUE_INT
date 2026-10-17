<script setup>
const { fila } = defineProps({ fila: Object })   // producto que recibe; desestructurar es reactivo desde Vue 3.5
const emit = defineEmits(['vender'])              // aviso que la fila le manda a quien la usa
</script>

<template>
  <article class="fila">
    <!-- v-once: la referencia se dibuja una sola vez, porque el id nunca cambia -->
    <small v-once>Ref. {{ fila.id }}</small>
    <strong>{{ fila.nombre }}</strong>
    <span>{{ fila.tipo }}</span>
    <span>{{ fila.precio }} USD</span>
    <span>Stock: {{ fila.stock }}</span>
    <button type="button" :aria-label="'Vender 1 de ' + fila.nombre" @click="emit('vender', fila.id)">Vender 1</button>
  </article>
</template>

<style scoped>
.fila { display: grid; grid-template-columns: 5rem 1fr 5rem 5rem 5rem 6rem; gap: 0.5rem; align-items: center;
  height: 56px; box-sizing: border-box; padding: 0 0.5rem; border-bottom: 1px solid #ddd; }
</style>
