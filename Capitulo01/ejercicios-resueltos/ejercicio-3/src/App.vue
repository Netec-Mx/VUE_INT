<script setup>
// Ejercicio 3: optimización medida sobre 5.000 objetos generados en memoria.
// Se mide una variante a la vez, con las MISMAS cinco pulsaciones, y se arma la tabla
// comparativa: línea base más los tres cambios aplicados en el orden del enunciado.
import { ref, shallowRef, nextTick, markRaw } from 'vue'
import { CANTIDAD, PULSACIONES } from './datos.js'
import VarianteBase from './VarianteBase.vue'
import VarianteComputed from './VarianteComputed.vue'
import VarianteShallow from './VarianteShallow.vue'
import VarianteMemo from './VarianteMemo.vue'

const VARIANTES = [
  { nombre: '1. Línea base (ref + filtro en plantilla)', comp: markRaw(VarianteBase) },
  { nombre: '2. Filtro movido a computed', comp: markRaw(VarianteComputed) },
  { nombre: '3. computed + shallowRef', comp: markRaw(VarianteShallow) },
  { nombre: '4. computed + shallowRef + v-memo', comp: markRaw(VarianteMemo) }
]

const activa = shallowRef(null)
const instancia = ref(null)
const mediciones = ref([])
const midiendo = ref(false)

// Ejecuta las cinco pulsaciones esperando el flush de render de cada una.
async function cincoPulsaciones(inst) {
  for (const p of PULSACIONES) {
    inst.setTermino(p)
    await nextTick()
  }
}

async function medirVariante(variante) {
  activa.value = variante
  await nextTick()
  const inst = instancia.value

  // Pasada de calentamiento que se descarta: evita medir el coste del primer montaje.
  await cincoPulsaciones(inst)
  inst.setTermino('')
  await nextTick()

  const t0 = performance.now()
  await cincoPulsaciones(inst)
  const ms = performance.now() - t0

  activa.value = null
  await nextTick()
  return ms
}

async function medirTodas() {
  midiendo.value = true
  mediciones.value = []
  for (const v of VARIANTES) {
    const ms = await medirVariante(v)
    mediciones.value = [...mediciones.value, { nombre: v.nombre, ms }]
  }
  midiendo.value = false
}

// Reducción acumulada de cada variante respecto de la línea base.
function reduccion(ms) {
  const base = mediciones.value[0]?.ms
  if (!base) return '-'
  return `${(((base - ms) / base) * 100).toFixed(1)} %`
}

// Aporte individual de cada cambio respecto de la variante inmediatamente anterior.
function aporte(indice) {
  if (indice === 0) return 'referencia'
  const previo = mediciones.value[indice - 1].ms
  const actual = mediciones.value[indice].ms
  const delta = (((previo - actual) / previo) * 100).toFixed(1)
  return `${delta} %`
}
</script>

<template>
  <section>
    <h1>Ejercicio 3 - Optimización medida</h1>
    <p>{{ CANTIDAD }} registros sintéticos. Cinco pulsaciones por medición, un cambio a la vez.</p>

    <button :disabled="midiendo" @click="medirTodas">
      {{ midiendo ? 'Midiendo...' : 'Medir las cuatro variantes' }}
    </button>

    <table border="1">
      <thead>
        <tr>
          <th>Variante</th>
          <th>Scripting de 5 pulsaciones (ms)</th>
          <th>Reducción acumulada vs base</th>
          <th>Aporte del cambio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(m, i) in mediciones" :key="m.nombre">
          <td>{{ m.nombre }}</td>
          <td>{{ m.ms.toFixed(1) }}</td>
          <td>{{ i === 0 ? '-' : reduccion(m.ms) }}</td>
          <td>{{ aporte(i) }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Cómo leer el resultado</h2>
    <ul>
      <li>
        Mover el filtro a un <code>computed</code> suele aportar lo más grande: en la plantilla el
        filtro se reevaluaba en cada render sin caché.
      </li>
      <li>
        <code>shallowRef</code> aporta sobre todo en el montaje y la recarga, porque evita convertir
        5.000 objetos anidados en proxys profundos; en el tecleo puro su aporte puede ser pequeño.
      </li>
      <li>
        <code>v-memo</code> puede aportar poco o nada aquí: al filtrar, el conjunto de filas cambia
        en cada pulsación y hay poco que memoizar. Ese también es un resultado válido y hay que
        decirlo, no esconderlo.
      </li>
    </ul>

    <!-- Solo se monta la variante que se está midiendo, para no falsear las cifras. -->
    <component :is="activa.comp" v-if="activa" ref="instancia" />
  </section>
</template>
