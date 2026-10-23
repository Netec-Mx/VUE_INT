<script setup>
// Lista: buscador y una tarjeta por producto
import { ref, inject, computed, onUpdated } from 'vue' // computed guarda un resultado y lo recalcula solo si cambia lo que usa
import TarjetaProducto from './TarjetaProducto.vue'
import { contar } from '../medicion.js'               // contadores del panel

const { productos, favoritos, alternarFavorito } = inject('catalogo') // recibe lo que App compartió con provide
const consulta = ref('')                              // texto del buscador: solo lo usa la lista

const filtrados = computed(() => {                    // antes: function filtrar() {
  contar('filtro')                                    // cuenta cada cálculo del filtro
  const texto = consulta.value.trim().toLowerCase()   // trim quita espacios a los lados; toLowerCase pasa a minúsculas
  if (!texto) return productos.value                  // sin texto: todos los productos
  return productos.value.filter((p) => p.nombre.toLowerCase().includes(texto))
})                                                    // antes: }

onUpdated(() => contar('lista'))                      // cuenta cada vez que la lista se vuelve a dibujar
</script>

<template>
  <label for="buscar">Buscar producto</label>
  <!-- v-model une la caja de texto con consulta: lo que escribes la cambia -->
  <input id="buscar" v-model="consulta" type="search" placeholder="Ejemplo: cable" />
  <p>Favoritos: {{ favoritos.length }} de {{ productos.length }} productos</p>
  <ul class="lista">
    <!-- filtrados es un computed: si la consulta no cambió, Vue reutiliza el resultado guardado -->
    <li v-for="producto in filtrados" :key="producto.id">
      <!-- cada tarjeta recibe solo lo que necesita: su producto y si es favorito -->
      <TarjetaProducto
        :producto="producto"
        :favorito="favoritos.includes(producto.id)"
        @alternar="alternarFavorito"
      />
    </li>
  </ul>
</template>
