<script setup>
// Tarjeta de un producto: recibe por props solo lo que necesita
import { onUpdated } from 'vue'
import { contar } from '../medicion.js'

const props = defineProps({
  producto: Object,                                   // el producto que se muestra
  favorito: Boolean                                   // true si este producto está marcado
})
const emit = defineEmits(['alternar'])                // aviso que la tarjeta le manda a la lista

onUpdated(() => contar('tarjetas'))                   // cuenta cada vez que una tarjeta se vuelve a dibujar
</script>

<template>
  <article class="tarjeta">
    <h2>{{ producto.nombre }}</h2>
    <p>{{ producto.precio.toLocaleString('es-CO') }} pesos</p>
    <button
      type="button"
      class="estrella"
      :aria-pressed="favorito"
      :aria-label="(favorito ? 'Quitar de favoritos: ' : 'Marcar como favorito: ') + producto.nombre"
      @click="emit('alternar', producto.id)"
    >{{ favorito ? '★' : '☆' }}</button>
  </article>
</template>
