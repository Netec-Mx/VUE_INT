<script setup>
// Lista SIN virtualizar: pinta una fila del DOM por cada registro filtrado.
// Es la medición "antes": con 5000 filas el navegador crea miles de nodos en cada filtrado.
defineProps({
  items: { type: Array, required: true },
  seleccionado: { type: Number, default: null },
  // Cuando es true se quita a propósito la dependencia de selección del arreglo de v-memo.
  memoRoto: { type: Boolean, default: false }
})

const emitir = defineEmits(['seleccionar'])
</script>

<template>
  <ul class="lista">
    <!-- v-memo va en el MISMO elemento que lleva el v-for; dentro del v-for no funcionaría. -->
    <!-- El arreglo conserva siempre dos posiciones: si 'memoRoto' está activo, la segunda queda -->
    <!-- congelada en false y la fila deja de enterarse de que fue seleccionada. -->
    <li
      v-for="item in items"
      :key="item.id"
      v-memo="[item.estado, memoRoto ? false : item.id === seleccionado]"
      :class="{ activa: item.id === seleccionado }"
      @click="emitir('seleccionar', item.id)"
    >
      {{ item.cliente }} - {{ item.ciudad }} - {{ item.estado }} -
      {{ item.id === seleccionado ? 'SELECCIONADA' : 'sin seleccionar' }}
    </li>
  </ul>
</template>

<style scoped>
.lista {
  height: 400px;
  overflow-y: auto;
  margin: 0;
  padding-left: 1rem;
  border: 1px solid #ccc;
}
.lista li {
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  list-style: none;
}
.activa {
  background: #ffe9a8;
}
</style>
