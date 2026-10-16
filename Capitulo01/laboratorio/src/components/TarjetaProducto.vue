<script setup>
// Tarjeta de un producto: muestra nombre, precio y la estrella de favorito
import { inject, onUpdated } from 'vue'
import { contar } from '../medicion.js'

const props = defineProps({ producto: Object })       // el producto llega desde la lista
const { favoritos, alternarFavorito } = inject('catalogo') // la tarjeta toma TODOS los favoritos

// Pregunta si este producto está en la lista de favoritos
function esFavorito() {
  return favoritos.value.includes(props.producto.id)  // lee la lista completa de favoritos
}

onUpdated(() => contar('tarjetas'))                   // cuenta cada vez que una tarjeta se vuelve a dibujar
</script>

<template>
  <article class="tarjeta">
    <h2>{{ producto.nombre }}</h2>
    <p>{{ producto.precio.toLocaleString('es-CO') }} pesos</p>
    <button
      type="button"
      class="estrella"
      :aria-pressed="esFavorito()"
      :aria-label="(esFavorito() ? 'Quitar de favoritos: ' : 'Marcar como favorito: ') + producto.nombre"
      @click="alternarFavorito(producto.id)"
    >{{ esFavorito() ? '★' : '☆' }}</button>
  </article>
</template>
