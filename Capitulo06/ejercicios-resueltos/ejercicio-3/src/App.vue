<script setup>
// Ejercicio 3: 5000 registros con buscador. Se mide el costo de escribir un carácter,
// primero con la lista completa y después con la lista virtualizada, con el mismo throttling.
import { ref, shallowRef, computed } from 'vue'
import { generarRegistros } from './datos/registros.js'
import { usarMedicion } from './medicion.js'
import ListaCompleta from './components/ListaCompleta.vue'
import ListaVirtual from './components/ListaVirtual.vue'

// shallowRef: 5000 objetos no necesitan reactividad profunda. Se reemplaza la raíz para actualizar.
const registros = shallowRef(generarRegistros(5000))

const busqueda = ref('')
const seleccionado = ref(null)
const virtual = ref(false)
const memoRoto = ref(false)
const contenedor = ref(null)

const { milisegundos, nodos, medir } = usarMedicion()

// Memoización del filtrado: se recalcula una vez por pulsación, no una vez por render.
const filtrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()
  if (!texto) return registros.value
  return registros.value.filter((r) => r.cliente.toLowerCase().includes(texto))
})

// Cada pulsación del buscador queda cronometrada.
function alEscribir(evento) {
  const texto = evento.target.value
  medir(() => { busqueda.value = texto }, contenedor.value)
}

function seleccionar(id) {
  medir(() => { seleccionado.value = seleccionado.value === id ? null : id }, contenedor.value)
}

const modo = computed(() => (virtual.value ? 'virtualizada' : 'completa'))
</script>

<template>
  <h1>5000 filas: virtualización y v-memo, con medición</h1>

  <p>
    <input :value="busqueda" placeholder="Buscar cliente" @input="alEscribir" />
    <label><input v-model="virtual" type="checkbox" /> Virtualizar la lista</label>
    <label><input v-model="memoRoto" type="checkbox" /> Romper v-memo (quitar la dependencia de selección)</label>
  </p>

  <p>
    Modo <strong>{{ modo }}</strong> - {{ filtrados.length }} filas filtradas -
    último cambio: <strong>{{ milisegundos }} ms</strong> -
    nodos del DOM en la lista: <strong>{{ nodos }}</strong>
  </p>

  <div ref="contenedor">
    <ListaVirtual
      v-if="virtual"
      :items="filtrados"
      :seleccionado="seleccionado"
      :memo-roto="memoRoto"
      @seleccionar="seleccionar"
    />
    <ListaCompleta
      v-else
      :items="filtrados"
      :seleccionado="seleccionado"
      :memo-roto="memoRoto"
      @seleccionar="seleccionar"
    />
  </div>

  <section>
    <h2>Procedimiento de medición (mismo throttling en las dos tomas)</h2>
    <ol>
      <li>DevTools, pestaña Performance: CPU 4x slowdown y red Slow 4G, sobre <code>npm run build</code> + <code>npm run preview</code>.</li>
      <li>Con la lista completa, escriba un carácter y anote los milisegundos y los nodos del DOM.</li>
      <li>Marque "Virtualizar la lista", repita el mismo carácter y anote las dos cifras otra vez.</li>
      <li>La virtualización aporta la mayor parte de la mejora: baja de miles de nodos a decenas,
        que es trabajo de creación y de diseño de página que el navegador deja de hacer.
        <code>v-memo</code> ahorra solo la comparación de los VNode de las filas ya renderizadas,
        que con la lista virtualizada son unas pocas decenas.</li>
      <li>Demostración del fallo: seleccione una fila, marque "Romper v-memo" y seleccione otra.
        La fila queda mostrando "sin seleccionar" aunque el dato en memoria sí cambió, porque
        el arreglo de dependencias ya no incluye la selección y Vue se salta esa actualización.</li>
    </ol>
  </section>
</template>
