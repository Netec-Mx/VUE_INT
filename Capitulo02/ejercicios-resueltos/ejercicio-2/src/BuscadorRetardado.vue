<script setup>
// Demuestra los tres criterios de corrección del ejercicio 2:
// 1. El mismo composable recibe un ref (el input) y un string fijo.
// 2. Al escribir "bogota" rápido, el contador de aplicaciones sube una sola vez.
// 3. Al desmontar el componente no queda ningún temporizador pendiente.
import { ref, watch } from 'vue'
import { useBusquedaRetardada } from './composables/useBusquedaRetardada.js'

const texto = ref('')
const { terminoAplicado } = useBusquedaRetardada(texto, 300)

// Un string fijo también es una entrada válida gracias a toValue().
const { terminoAplicado: fijo } = useBusquedaRetardada('valor fijo sin ref', 300)

const pulsaciones = ref(0)
const aplicaciones = ref(0)

watch(texto, () => { pulsaciones.value += 1 })
watch(terminoAplicado, () => { aplicaciones.value += 1 })
</script>

<template>
  <section>
    <label>
      Ciudad:
      <input v-model="texto" placeholder="escriba bogota sin pausas" />
    </label>

    <p>Término aplicado: <strong>{{ terminoAplicado || '(vacío)' }}</strong></p>
    <p>Entrada con string fijo: <strong>{{ fijo }}</strong></p>
    <p>Pulsaciones: {{ pulsaciones }} - aplicaciones del término: {{ aplicaciones }}</p>
  </section>
</template>
