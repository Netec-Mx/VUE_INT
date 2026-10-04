<script setup>
// Cambio 3: se agrega v-memo EN EL MISMO ELEMENTO del v-for.
// El arreglo de dependencias incluye TODA expresión que aparece dentro del subárbol
// memoizado (nombre, saldo, estado) más la selección: si falta alguna, hay datos congelados.
import { ref, shallowRef, computed } from 'vue'
import { generarDatos } from './datos.js'

const lista = shallowRef(generarDatos())
const termino = ref('')
const seleccionado = ref(null)

const filtradas = computed(() =>
  lista.value.filter((x) => x.nombre.toLowerCase().includes(termino.value.toLowerCase()))
)

function setTermino(valor) {
  termino.value = valor
}

function recargar() {
  lista.value = generarDatos()
}

defineExpose({ setTermino, recargar })
</script>

<template>
  <table>
    <tbody>
      <tr
        v-for="o in filtradas"
        :key="o.id"
        v-memo="[o.nombre, o.saldo, o.estado, o.id === seleccionado]"
        @click="seleccionado = o.id"
      >
        <td>{{ o.nombre }}</td>
        <td>{{ o.saldo }}</td>
        <td>{{ o.estado }}</td>
      </tr>
    </tbody>
  </table>
</template>
