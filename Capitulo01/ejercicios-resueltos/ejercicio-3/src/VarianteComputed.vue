<script setup>
// Cambio 1: el filtro sale de la plantilla y se convierte en computed.
// Se calcula una vez por cambio de dependencia y queda cacheado.
import { ref, computed } from 'vue'
import { generarDatos } from './datos.js'

const lista = ref(generarDatos())
const termino = ref('')

const filtradas = computed(() =>
  lista.value.filter((x) => x.nombre.toLowerCase().includes(termino.value.toLowerCase()))
)

function setTermino(valor) {
  termino.value = valor
}

defineExpose({ setTermino })
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
