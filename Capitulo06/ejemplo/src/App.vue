<script setup>
// Traemos de Vue solo las cuatro herramientas que este componente necesita para ir rápido.
import { ref, shallowRef, computed, defineAsyncComponent } from 'vue'
import { cargarPedidosIniciales } from './datos/pedidos.js'

// Declaramos un componente "asíncrono": su código NO viaja en la descarga inicial de la página.
const PanelDetalle = defineAsyncComponent({
  // El import() dinámico le ordena al empaquetador guardar este archivo en un paquete aparte.
  loader: () => import('./components/PanelDetalle.vue'),
  // Lo que el usuario ve mientras ese paquete viaja por la red.
  loadingComponent: { template: '<p>Cargando el detalle...</p>' },
  // Lo que ve si la descarga falla, para que nunca quede un hueco mudo en pantalla.
  errorComponent: { template: '<p>No se pudo cargar el detalle.</p>' },
  // Esperamos 200 ms antes de mostrar el mensaje de carga: en redes rápidas nadie alcanza a verlo.
  delay: 200,
  // Si a los 10 segundos no llegó, damos la descarga por fallida y mostramos el mensaje de error.
  timeout: 10000
})

// Lista grande de datos. shallowRef evita el costo de volver reactivo cada objeto por dentro.
const pedidos = shallowRef(cargarPedidosIniciales())

// Texto que el usuario escribe en el buscador. Es pequeño, así que un ref normal basta.
const busqueda = ref('')

// Guarda cuál fila está abierta en el detalle. null significa que no hay ninguna abierta.
const pedidoAbierto = ref(null)

// MEMOIZACIÓN: este cálculo se guarda y solo se rehace si cambian 'pedidos' o 'busqueda'.
const pedidosFiltrados = computed(() => {
  // Pasamos el texto buscado a minúsculas una sola vez, no una vez por cada fila.
  const texto = busqueda.value.trim().toLowerCase()
  // Si el buscador está vacío, devolvemos la lista tal cual y nos ahorramos recorrerla.
  if (!texto) return pedidos.value
  // Recorremos la lista una sola vez y dejamos solo las filas cuyo cliente contiene el texto.
  return pedidos.value.filter((p) => p.cliente.toLowerCase().includes(texto))
})

// Otro cálculo memoizado: la suma solo se rehace cuando cambia la lista ya filtrada.
const totalFiltrado = computed(() =>
  // reduce recorre las filas acumulando el valor de cada una hasta obtener un único número.
  pedidosFiltrados.value.reduce((suma, p) => suma + p.valor, 0)
)

// Marca qué fila debe mostrar su detalle; al cambiar este valor, Vue repinta solo lo necesario.
function abrir(id) {
  // Si la fila ya estaba abierta la cerramos; si no, la abrimos.
  pedidoAbierto.value = pedidoAbierto.value === id ? null : id
}

// Agrega un pedido REEMPLAZANDO la lista completa: con shallowRef, mutarla por dentro no avisa a Vue.
function agregar(nuevo) {
  pedidos.value = [...pedidos.value, nuevo]
}

// Botón de demostración: arma un pedido nuevo y lo agrega por la vía correcta.
function agregarDemo() {
  agregar({
    id: pedidos.value.length + 1,
    cliente: `Cliente agregado #${pedidos.value.length + 1}`,
    estado: 'pendiente',
    valor: 123456,
    ciudad: 'Cali'
  })
}
</script>

<template>
  <h1>Pedidos con carga diferida y memoización</h1>

  <!-- v-model conecta la caja de texto con la variable 'busqueda' en ambos sentidos. -->
  <input v-model="busqueda" placeholder="Buscar cliente" />
  <button @click="agregarDemo">Agregar pedido</button>

  <!-- Mostramos el resultado de los dos cálculos memoizados; Vue reusa el valor guardado. -->
  <p>{{ pedidosFiltrados.length }} pedidos por {{ totalFiltrado }}</p>

  <ul>
    <!-- Recorremos la lista filtrada. La 'key' le permite a Vue reutilizar filas en vez de recrearlas. -->
    <!-- v-memo va en el MISMO elemento del v-for y salta el repintado de la fila si nada cambió. -->
    <li
      v-for="pedido in pedidosFiltrados"
      :key="pedido.id"
      v-memo="[pedido.estado, pedido.id === pedidoAbierto]"
    >
      <!-- Al hacer clic abrimos o cerramos el detalle de esta fila. -->
      <button @click="abrir(pedido.id)">{{ pedido.cliente }} - {{ pedido.estado }}</button>

      <!-- El panel pesado solo se monta aquí, y su código recién se descarga en este momento. -->
      <PanelDetalle v-if="pedido.id === pedidoAbierto" :pedido="pedido" />
    </li>
  </ul>
</template>
