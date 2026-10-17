<script setup>
// Tarjeta de un producto: recibe por props solo lo que necesita
import { onUpdated } from 'vue'                      // función que avisa después de cada redibujo
import { contar } from '../medicion.js'              // contadores del panel

defineProps({                                        // datos que la tarjeta recibe de la lista
  producto: Object,                                  // el producto que se muestra
  favorito: Boolean                                  // true si este producto está marcado
})
const emit = defineEmits(['alternar'])               // aviso que la tarjeta le manda a la lista

onUpdated(() => contar('tarjetas'))                  // cuenta cada vez que esta tarjeta se redibuja
</script>

<template>
  <article class="tarjeta">
    <h2>{{ producto.nombre }}</h2>
    <p>{{ producto.precio.toLocaleString('es-CO') }} pesos</p>
    <!-- aria-pressed y aria-label le dicen al lector de pantalla si está marcada y de qué producto es -->
    <button
      type="button"
      class="estrella"
      :aria-pressed="favorito"
      :aria-label="(favorito ? 'Quitar de favoritos: ' : 'Marcar como favorito: ') + producto.nombre"
      @click="emit('alternar', producto.id)"
    >{{ favorito ? '★' : '☆' }}</button>
  </article>
</template>
