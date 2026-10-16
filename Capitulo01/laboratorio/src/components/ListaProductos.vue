<script setup>
// Lista de productos: filtra según la búsqueda y dibuja una tarjeta por producto
import { inject, onUpdated } from 'vue'
import TarjetaProducto from './TarjetaProducto.vue'
import { contar } from '../medicion.js'               // contadores de dibujos

const { productos, consulta, favoritos } = inject('catalogo')

// Devuelve los productos cuyo nombre contiene el texto buscado
function filtrar() {
  contar('filtro')                                    // cuenta cada vez que se calcula el filtro
  const texto = consulta.value.trim().toLowerCase()   // trim quita espacios; toLowerCase pasa a minúsculas
  if (!texto) return productos.value                  // sin texto: todos los productos
  return productos.value.filter((p) => p.nombre.toLowerCase().includes(texto))
}

onUpdated(() => contar('lista'))                      // cuenta cada vez que la lista se vuelve a dibujar
</script>

<template>
  <p class="resumen">Favoritos: {{ favoritos.length }} de {{ productos.length }} productos</p>
  <ul class="lista">
    <!-- filtrar() se ejecuta de nuevo cada vez que la lista se dibuja -->
    <li v-for="producto in filtrar()" :key="producto.id">
      <TarjetaProducto :producto="producto" />
    </li>
  </ul>
</template>
