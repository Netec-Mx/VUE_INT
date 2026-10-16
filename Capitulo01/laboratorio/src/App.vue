<script setup>
// Componente principal: guarda los datos del catálogo y los comparte con provide
import { ref, provide } from 'vue'                    // ref crea datos vigilados; provide los comparte
import { productosIniciales } from './datos.js'       // los 12 productos de ejemplo
import BarraBusqueda from './components/BarraBusqueda.vue'
import ListaProductos from './components/ListaProductos.vue'
import PanelMedicion from './components/PanelMedicion.vue'

const productos = ref([...productosIniciales])        // copia de la lista de datos.js (Vue vigila cada producto por dentro)
const consulta = ref('')                              // texto que la persona escribe en el buscador
const favoritos = ref([])                             // identificadores de los productos marcados con estrella

// Marca o desmarca un producto como favorito
function alternarFavorito(id) {
  const posicion = favoritos.value.indexOf(id)        // busca el id en la lista; -1 si no está
  if (posicion === -1) favoritos.value.push(id)       // no estaba: lo agrega
  else favoritos.value.splice(posicion, 1)            // ya estaba: lo quita
}

// Agrega un producto de prueba al final de la lista
let siguienteId = 13                                  // número para el próximo producto
function agregarProducto() {
  const nuevo = { id: siguienteId, nombre: 'Producto nuevo ' + siguienteId, precio: 50000 }
  siguienteId++                                       // el siguiente tendrá otro número
  productos.value.push(nuevo)                         // lo agrega al final de la lista
}

// Comparte los datos con todos los componentes de abajo, sin pasarlos de uno en uno
provide('catalogo', { productos, consulta, favoritos, alternarFavorito })
</script>

<template>
  <header class="encabezado">
    <h1>Catálogo de accesorios</h1>
    <button type="button" @click="agregarProducto">Agregar producto de prueba</button>
  </header>
  <main class="contenido">
    <section class="columna-principal">
      <BarraBusqueda />
      <ListaProductos />
    </section>
    <PanelMedicion />
  </main>
</template>
