<script setup>
// Lista de productos: filtra según la búsqueda y dibuja una tarjeta por producto
import { inject, computed, onUpdated } from 'vue'   // computed guarda un resultado y lo recalcula solo si cambia lo que usa
import TarjetaProducto from './TarjetaProducto.vue'
import { contar } from '../medicion.js'               // contadores de dibujos

const { productos, consulta, favoritos, alternarFavorito } = inject('catalogo')

// Productos cuyo nombre contiene el texto buscado. Se recalcula solo si cambia la consulta o la lista.
const filtrados = computed(() => {
  contar('filtro')                                    // cuenta cada vez que se calcula el filtro
  const texto = consulta.value.trim().toLowerCase()   // trim quita espacios; toLowerCase pasa a minúsculas
  if (!texto) return productos.value                  // sin texto: todos los productos
  return productos.value.filter((p) => p.nombre.toLowerCase().includes(texto))
})

onUpdated(() => contar('lista'))                      // cuenta cada vez que la lista se vuelve a dibujar
</script>

<template>
  <p class="resumen">Favoritos: {{ favoritos.length }} de {{ productos.length }} productos</p>
  <ul class="lista">
    <!-- filtrados es un computed: si la consulta no cambió, Vue reutiliza el resultado guardado -->
    <li v-for="producto in filtrados" :key="producto.id">
      <!-- la tarjeta recibe solo lo que necesita: su producto y si es favorito -->
      <TarjetaProducto
        :producto="producto"
        :favorito="favoritos.includes(producto.id)"
        @alternar="alternarFavorito"
      />
    </li>
  </ul>
</template>
