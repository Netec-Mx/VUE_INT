<script setup>
import { ref } from 'vue'
import BuscadorRetardado from './BuscadorRetardado.vue'

const visible = ref(true)
</script>

<template>
  <main>
    <h1>Ejercicio 2 - useBusquedaRetardada</h1>
    <p>
      Escriba rápido y observe que el término aplicado cambia una sola vez.
      Desmonte el componente mientras escribe: no aparece ninguna advertencia
      porque el temporizador pendiente se cancela.
    </p>

    <button @click="visible = !visible">
      {{ visible ? 'Desmontar' : 'Montar' }} el buscador
    </button>

    <BuscadorRetardado v-if="visible" />
  </main>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
main { max-width: 42rem; margin: 0 auto; padding: 1rem; }
</style>
