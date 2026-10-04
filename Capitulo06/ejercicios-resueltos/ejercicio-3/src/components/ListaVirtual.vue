<script setup>
// Lista virtual mínima, escrita a mano para no depender de librerías externas.
// Idea: un contenedor de alto fijo, un espaciador con el alto total de la lista completa,
// y solo las filas de la ventana visible (más un colchón) posicionadas en absoluto.
import { ref, computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  seleccionado: { type: Number, default: null },
  memoRoto: { type: Boolean, default: false },
  alto: { type: Number, default: 400 },
  altoFila: { type: Number, default: 28 }
})

const emitir = defineEmits(['seleccionar'])

const COLCHON = 5
const desplazamiento = ref(0)

// Índice de la primera fila que se renderiza, con colchón hacia arriba.
const primero = computed(() =>
  Math.max(0, Math.floor(desplazamiento.value / props.altoFila) - COLCHON)
)

// Cuántas filas caben en la ventana, más el colchón de arriba y el de abajo.
const cantidadVisible = computed(() => Math.ceil(props.alto / props.altoFila) + COLCHON * 2)

// Solo este pedazo del arreglo llega al DOM: decenas de nodos en vez de miles.
const visibles = computed(() => props.items.slice(primero.value, primero.value + cantidadVisible.value))

// El espaciador mantiene la barra de desplazamiento del tamaño real de la lista.
const altoTotal = computed(() => props.items.length * props.altoFila)

function alDesplazar(evento) {
  desplazamiento.value = evento.target.scrollTop
}
</script>

<template>
  <div class="ventana" :style="{ height: alto + 'px' }" @scroll="alDesplazar">
    <div class="espaciador" :style="{ height: altoTotal + 'px' }">
      <!-- El arreglo de v-memo incluye TODO lo que la fila usa para pintarse: estado, selección
           y posición absoluta. Omitir la posición dejaría filas mal ubicadas al filtrar. -->
      <div
        v-for="(item, indice) in visibles"
        :key="item.id"
        v-memo="[item.estado, memoRoto ? false : item.id === seleccionado, primero + indice]"
        class="fila"
        :class="{ activa: item.id === seleccionado }"
        :style="{ top: (primero + indice) * altoFila + 'px', height: altoFila + 'px' }"
        @click="emitir('seleccionar', item.id)"
      >
        {{ item.cliente }} - {{ item.ciudad }} - {{ item.estado }} -
        {{ item.id === seleccionado ? 'SELECCIONADA' : 'sin seleccionar' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.ventana {
  overflow-y: auto;
  border: 1px solid #ccc;
}
.espaciador {
  position: relative;
}
.fila {
  position: absolute;
  left: 0;
  right: 0;
  padding-left: 0.5rem;
  line-height: 28px;
  cursor: pointer;
}
.activa {
  background: #ffe9a8;
}
</style>
