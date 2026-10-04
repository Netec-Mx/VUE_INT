<script setup>
// Cambio 2: la lista pasa de ref a shallowRef.
// Se ahorra convertir 5.000 objetos (con su nivel anidado) en proxys profundos.
// Regla: la lista SIEMPRE se reemplaza completa, nunca se muta por dentro.
import { ref, shallowRef, computed } from 'vue'
import { generarDatos } from './datos.js'

const lista = shallowRef(generarDatos())
const termino = ref('')

const filtradas = computed(() =>
  lista.value.filter((x) => x.nombre.toLowerCase().includes(termino.value.toLowerCase()))
)

function setTermino(valor) {
  termino.value = valor
}

// Recarga válida para un shallowRef: asignación del arreglo completo.
function recargar() {
  lista.value = generarDatos()
}

defineExpose({ setTermino, recargar })
</script>

<template>
  <table>
    <tbody>
      <tr v-for="o in filtradas" :key="o.id">
        <td>{{ o.nombre }}</td>
        <td>{{ o.saldo }}</td>
        <td>{{ o.estado }}</td>
      </tr>
    </tbody>
  </table>
</template>
