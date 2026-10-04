<script setup>
// SOLUCIÓN DEL EJERCICIO 1: traducción fiel a <script setup>, sin extraer
// composables. data -> ref, computed -> computed(), methods -> funciones,
// watch -> watch(), mounted -> onMounted, beforeUnmount -> onUnmounted.
// No queda ni un solo "this." y cada efecto registrado tiene su limpieza.
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const segundos = ref(0)
const despachos = ref(0)
const meta = ref(10)
const anchoVentana = ref(0)
const historial = ref([])
let intervalo = null

const porcentaje = computed(() => Math.min(100, Math.round((despachos.value / meta.value) * 100)))
const resumen = computed(() => `${despachos.value} de ${meta.value} despachos en ${segundos.value} s`)

function registrarDespacho() {
  despachos.value += 1
}

function reiniciar() {
  despachos.value = 0
  segundos.value = 0
  historial.value = []
}

function medirVentana() {
  anchoVentana.value = window.innerWidth
}

watch(despachos, (nuevo, anterior) => {
  historial.value.push(`${anterior} -> ${nuevo} en el segundo ${segundos.value}`)
})

onMounted(() => {
  medirVentana()
  window.addEventListener('resize', medirVentana)
  intervalo = setInterval(() => { segundos.value += 1 }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', medirVentana)
  clearInterval(intervalo)
})
</script>

<template>
  <section>
    <h3>Versión refactorizada (script setup)</h3>
    <p>{{ resumen }} - {{ porcentaje }}% de la meta</p>
    <p>Ancho de ventana: {{ anchoVentana }} px</p>
    <button @click="registrarDespacho">Registrar despacho</button>
    <button @click="reiniciar">Reiniciar</button>
    <ol><li v-for="(linea, i) in historial" :key="i">{{ linea }}</li></ol>
  </section>
</template>
