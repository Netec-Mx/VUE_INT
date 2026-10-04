<script setup>
import { computed } from 'vue'

const UMBRAL_SUFICIENTE = 10

const props = defineProps({
  unidades: { type: Number, required: true }
})

const estado = computed(() => {
  if (props.unidades === 0) return { clase: 'rojo', mensaje: 'Agotado' }
  if (props.unidades <= UMBRAL_SUFICIENTE) {
    return { clase: 'amarillo', mensaje: `Quedan ${props.unidades} unidades` }
  }
  return { clase: 'verde', mensaje: `Disponible: ${props.unidades} unidades` }
})
</script>

<template>
  <p data-test="alerta" :class="estado.clase">{{ estado.mensaje }}</p>
</template>

<style scoped>
.verde { color: #1b7f3b; }
.amarillo { color: #b07a05; }
.rojo { color: #b3261e; }
</style>
