<script setup>
// Línea base: ref profundo (5.000 objetos convertidos en proxys) y filtro DENTRO de la plantilla.
// El filtro se recalcula en cada render, sin caché, y arrastra toda la lista.
import { ref } from 'vue'
import { generarDatos } from './datos.js'

const lista = ref(generarDatos())
const termino = ref('')

function setTermino(valor) {
  termino.value = valor
}

defineExpose({ setTermino })
</script>

<template>
  <table>
    <tbody>
      <tr
        v-for="o in lista.filter((x) => x.nombre.toLowerCase().includes(termino.toLowerCase()))"
        :key="o.id"
      >
        <td>{{ o.nombre }}</td>
        <td>{{ o.saldo }}</td>
        <td>{{ o.estado }}</td>
      </tr>
    </tbody>
  </table>
</template>
