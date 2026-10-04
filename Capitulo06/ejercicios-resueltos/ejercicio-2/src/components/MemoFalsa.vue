<script setup>
// VERSIÓN 1: memoización APARENTE.
// El computed devuelve un objeto NUEVO en cada cálculo. Como Vue compara por identidad,
// el objeto nuevo nunca es "igual" al anterior y todo lo que depende del computed se vuelve a ejecutar,
// aunque el valor lógico (esPar) siga siendo el mismo.
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  contador: { type: Number, required: true }
})

// Contador de disparos del efecto. Se escribe, nunca se lee dentro del watchEffect:
// leerlo ahí adentro crearía una dependencia circular y un ciclo infinito de actualizaciones.
let veces = 0
const disparos = ref(0)
const ultimoValor = ref('')

const resultado = computed(() => ({
  esPar: props.contador % 2 === 0
}))

watchEffect(() => {
  const valor = resultado.value.esPar
  veces += 1
  disparos.value = veces
  ultimoValor.value = String(valor)
  console.log('[memoización aparente] disparo', veces, 'esPar =', valor)
})
</script>

<template>
  <article>
    <h2>1. Memoización aparente (objeto nuevo en cada cálculo)</h2>
    <p>Disparos del watchEffect: <strong>{{ disparos }}</strong></p>
    <p>Último valor leído: {{ ultimoValor }}</p>
    <p>
      Se dispara cada vez que cambia <code>contador</code>, incluso cuando la paridad no cambia,
      porque el computed devuelve una referencia distinta en cada cálculo.
    </p>
  </article>
</template>
