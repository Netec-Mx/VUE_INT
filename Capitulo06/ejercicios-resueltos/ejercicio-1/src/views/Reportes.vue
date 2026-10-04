<script setup>
// Vista pesada: importa la librería de gráficas. Con la ruta perezosa, esa librería
// deja de viajar en el chunk de entrada y aparece en el chunk de Reportes.
import { ref, computed } from 'vue'
import { escalarSerie, resumirSerie, trazarLinea, marcasEjeY, construirLeyenda } from '../lib/graficas-pesadas.js'

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Serie generada con un bucle: sin red, sin backend, reproducible en cualquier máquina.
const serie = ref(MESES.map((_, i) => 400 + ((i * 1733) % 900)))

const alturas = computed(() => escalarSerie(serie.value))
const resumen = computed(() => resumirSerie(serie.value))
const linea = computed(() => trazarLinea(serie.value))
const marcas = computed(() => marcasEjeY(serie.value))
const leyenda = computed(() => construirLeyenda(MESES))

function recalcular() {
  serie.value = MESES.map(() => 400 + Math.floor(Math.random() * 900))
}
</script>

<template>
  <section>
    <h2>Reportes</h2>
    <button @click="recalcular">Recalcular serie</button>

    <svg width="480" height="180" role="img" aria-label="Ventas por mes">
      <polyline :points="linea" fill="none" stroke="#1f77b4" stroke-width="2" />
      <rect
        v-for="(alto, i) in alturas"
        :key="i"
        :x="i * 40 + 4"
        :y="160 - alto"
        width="30"
        :height="alto"
        :fill="leyenda[i].color"
        opacity="0.35"
      />
    </svg>

    <p>Eje Y: {{ marcas.join(' | ') }}</p>
    <p>
      Total {{ resumen.total }} - promedio {{ resumen.promedio }} - mediana {{ resumen.mediana }} -
      desviación {{ resumen.desviacion }}
    </p>
  </section>
</template>
