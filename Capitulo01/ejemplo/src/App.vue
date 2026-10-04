<script setup>
// Traemos de Vue solo las herramientas que vamos a usar en este archivo.
import { ref, shallowRef, computed, watch, onMounted, onUnmounted, onRenderTriggered } from 'vue'
// El módulo local reemplaza la llamada HTTP del capítulo: mock para fines educativos.
import { obtenerObligaciones } from './api.js'

// "termino" guarda lo que el usuario escribe en el buscador; empieza vacío.
const termino = ref('')

// "obligaciones" guarda la lista completa que llega del servidor.
// Usamos shallowRef porque la lista es grande y siempre la reemplazamos entera:
// así Vue no gasta tiempo vigilando cada campo de cada registro.
const obligaciones = shallowRef([])

// "cargando" nos dice si hay una consulta en curso, para mostrar un aviso en pantalla.
const cargando = ref(false)

// "seleccionado" guarda el id de la fila marcada; entra en las dependencias de v-memo.
const seleccionado = ref(null)

// "filtradas" es un valor derivado: Vue lo recalcula solo cuando cambia el término o la lista.
const filtradas = computed(() =>
  // Recorremos la lista y dejamos pasar solo los registros cuyo nombre contiene el término.
  obligaciones.value.filter((o) => o.nombre.toLowerCase().includes(termino.value.toLowerCase()))
)

// "total" es otro valor derivado: la suma de los saldos de lo que quedó filtrado.
const total = computed(() =>
  // reduce va acumulando el saldo de cada registro sobre un acumulador que empieza en 0.
  filtradas.value.reduce((suma, o) => suma + o.saldo, 0)
)

// Función que pide los datos al servidor y reemplaza la lista completa.
async function cargarObligaciones() {
  // Encendemos el indicador de carga antes de salir a la red.
  cargando.value = true
  // Pedimos los datos y esperamos la respuesta del servidor (aquí, del mock local).
  const datos = await obtenerObligaciones()
  // Asignamos el arreglo COMPLETO: con shallowRef esto es lo que dispara el nuevo render.
  obligaciones.value = datos
  // Apagamos el indicador de carga porque ya terminamos.
  cargando.value = false
}

// Observamos el término de búsqueda para registrar en consola cuántos resultados quedan.
watch(termino, (nuevo) => {
  // Cada vez que el usuario cambia el texto, mostramos el término y las coincidencias.
  console.log('buscando:', nuevo, '->', filtradas.value.length, 'resultados')
})

// Función que reacciona a la tecla Escape para limpiar el buscador.
function alPresionarTecla(evento) {
  // Si la tecla presionada fue Escape, vaciamos el término de búsqueda.
  if (evento.key === 'Escape') termino.value = ''
}

// Cuando el componente ya está en pantalla, pedimos los datos y escuchamos el teclado.
onMounted(() => {
  // Lanzamos la primera carga de datos.
  cargarObligaciones()
  // Nos suscribimos al evento de teclado de toda la ventana.
  window.addEventListener('keydown', alPresionarTecla)
})

// Cuando el componente se retira de la pantalla, soltamos lo que habíamos reservado.
onUnmounted(() => {
  // Quitamos el listener para no dejar basura escuchando eventos: eso causa fugas de memoria.
  window.removeEventListener('keydown', alPresionarTecla)
})

// Solo en desarrollo: nos dice qué dato provocó cada nuevo render de este componente.
onRenderTriggered((e) => {
  // Imprimimos la propiedad culpable y el tipo de operación que la cambió.
  console.log('re-render disparado por:', e.key, e.type)
})
</script>

<template>
  <section>
    <!-- v-model conecta el campo de texto con la variable "termino" en los dos sentidos. -->
    <input v-model="termino" placeholder="Buscar obligación" />

    <!-- v-once: este título se dibuja una sola vez y Vue no vuelve a revisarlo nunca. -->
    <h2 v-once>Cartera vigente</h2>

    <!-- Mostramos este aviso solo mientras la consulta está en curso. -->
    <p v-if="cargando">Cargando datos...</p>

    <!-- Cuando ya no está cargando, mostramos la lista de resultados. -->
    <ul v-else>
      <!-- Recorremos las filtradas; :key usa el id real del registro, nunca el índice. -->
      <!-- v-memo evita redibujar la fila mientras su saldo y su selección no cambien. -->
      <li
        v-for="o in filtradas"
        :key="o.id"
        v-memo="[o.saldo, o.id === seleccionado]"
        @click="seleccionado = o.id"
      >
        <!-- Pintamos el nombre y el saldo de cada obligación. -->
        {{ o.nombre }} - {{ o.saldo }}
      </li>
    </ul>

    <!-- El total se recalcula solo cuando cambia el resultado del filtro. -->
    <p>Total filtrado: {{ total }}</p>
  </section>
</template>
