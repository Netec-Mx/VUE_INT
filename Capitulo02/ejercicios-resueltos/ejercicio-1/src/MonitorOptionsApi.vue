<script>
// PUNTO DE PARTIDA (no se modifica): componente en Options API con data,
// dos computed, tres methods, un watch y los hooks mounted y beforeUnmount.
// Se conserva en el proyecto para poder comparar el antes y el después.
export default {
  name: 'MonitorOptionsApi',

  data() {
    return {
      segundos: 0,
      despachos: 0,
      meta: 10,
      anchoVentana: 0,
      historial: [],
      intervalo: null
    }
  },

  computed: {
    porcentaje() {
      return Math.min(100, Math.round((this.despachos / this.meta) * 100))
    },
    resumen() {
      return `${this.despachos} de ${this.meta} despachos en ${this.segundos} s`
    }
  },

  methods: {
    registrarDespacho() {
      this.despachos += 1
    },
    reiniciar() {
      this.despachos = 0
      this.segundos = 0
      this.historial = []
    },
    medirVentana() {
      this.anchoVentana = window.innerWidth
    }
  },

  watch: {
    despachos(nuevo, anterior) {
      this.historial.push(`${anterior} -> ${nuevo} en el segundo ${this.segundos}`)
    }
  },

  mounted() {
    this.medirVentana()
    window.addEventListener('resize', this.medirVentana)
    this.intervalo = setInterval(() => { this.segundos += 1 }, 1000)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.medirVentana)
    clearInterval(this.intervalo)
  }
}
</script>

<template>
  <section>
    <h3>Versión original (Options API)</h3>
    <p>{{ resumen }} - {{ porcentaje }}% de la meta</p>
    <p>Ancho de ventana: {{ anchoVentana }} px</p>
    <button @click="registrarDespacho">Registrar despacho</button>
    <button @click="reiniciar">Reiniciar</button>
    <ol><li v-for="(linea, i) in historial" :key="i">{{ linea }}</li></ol>
  </section>
</template>
