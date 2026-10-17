<script setup>
// Componente principal: guarda los datos del catálogo y los comparte con provide
import { ref, shallowRef, provide } from 'vue'        // shallowRef vigila solo el cambio de la lista entera
import { productosIniciales } from './datos.js'       // los 12 productos de ejemplo
import { dibujos, reiniciar } from './medicion.js'    // contadores del panel
import ListaProductos from './components/ListaProductos.vue'

const productos = shallowRef([...productosIniciales]) // antes: ref([...productosIniciales])
const favoritos = ref([])                             // ids de los productos marcados con estrella

function alternarFavorito(id) {                       // marca o desmarca un producto
  const posicion = favoritos.value.indexOf(id)        // busca el id; -1 si no está
  if (posicion === -1) favoritos.value.push(id)       // no estaba: lo agrega
  else favoritos.value.splice(posicion, 1)            // ya estaba: lo quita
}

let siguienteId = 13                                  // número del próximo producto de prueba
function agregarProducto() {
  const nuevo = { id: siguienteId, nombre: 'Producto nuevo ' + siguienteId, precio: 50000 }
  siguienteId++                                       // el siguiente tendrá otro número
  productos.value = [...productos.value, nuevo]       // lista nueva: copia los anteriores y suma el nuevo
}

provide('catalogo', { productos, favoritos, alternarFavorito }) // comparte con todos los componentes de abajo
</script>

<template>
  <header class="encabezado">
    <h1>Catálogo de accesorios</h1>
    <button type="button" @click="agregarProducto">Agregar producto de prueba</button>
  </header>
  <main class="contenido">
    <section><ListaProductos /></section>
    <!-- Panel de medición: cópialo tal cual, no es el tema de hoy -->
    <aside class="medicion" aria-live="polite">
      <h2>Medición</h2>
      <dl>
        <div><dt>Dibujos de tarjetas</dt><dd data-prueba="tarjetas">{{ dibujos.tarjetas }}</dd></div>
        <div><dt>Dibujos de la lista</dt><dd data-prueba="lista">{{ dibujos.lista }}</dd></div>
        <div><dt>Cálculos del filtro</dt><dd data-prueba="filtro">{{ dibujos.filtro }}</dd></div>
      </dl>
      <button type="button" @click="reiniciar">Reiniciar contadores</button>
    </aside>
  </main>
</template>
