<script setup>
// VERSIÓN 2: memoización REAL.
// El getter del computed recibe el valor anterior (oldValue). Si el resultado lógico no cambió,
// devolvemos el MISMO objeto: la identidad se conserva y Vue no dispara los efectos que dependen de él.
// Es la técnica que documenta la guía oficial de rendimiento de Vue.
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  contador: { type: Number, required: true }
})

let veces = 0
const disparos = ref(0)
const ultimoValor = ref('')

const resultado = computed((valorAnterior) => {
  const nuevo = { esPar: props.contador % 2 === 0 }
  // Comparación manual: misma paridad, mismo objeto.
  if (valorAnterior && valorAnterior.esPar === nuevo.esPar) {
    return valorAnterior
  }
  return nuevo
})

watchEffect(() => {
  const valor = resultado.value.esPar
  veces += 1
  disparos.value = veces
  ultimoValor.value = String(valor)
  console.log('[memoización real] disparo', veces, 'esPar =', valor)
})
</script>

<template>
  <article>
    <h2>2. Memoización real (se reutiliza el objeto anterior)</h2>
    <p>Disparos del watchEffect: <strong>{{ disparos }}</strong></p>
    <p>Último valor leído: {{ ultimoValor }}</p>
    <p>
      Solo se dispara cuando la paridad cambia de verdad. Sumar 2 al contador no cambia la paridad,
      el computed devuelve el objeto anterior y Vue corta la propagación.
    </p>
  </article>
</template>
