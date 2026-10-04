<script setup>
// Montar y desmontar la versión refactorizada sirve para comprobar el criterio
// de corrección: al desmontar, el intervalo y el listener de resize desaparecen.
import { ref } from 'vue'
import MonitorOptionsApi from './MonitorOptionsApi.vue'
import MonitorScriptSetup from './MonitorScriptSetup.vue'

const visible = ref(true)
</script>

<template>
  <main>
    <h1>Ejercicio 1 - Traducción fiel a script setup</h1>
    <p>Ambas versiones se comportan igual; la de la derecha no usa "this".</p>

    <button @click="visible = !visible">
      {{ visible ? 'Desmontar' : 'Montar' }} la versión refactorizada
    </button>

    <div class="columnas">
      <MonitorOptionsApi />
      <MonitorScriptSetup v-if="visible" />
    </div>
  </main>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
.columnas { display: flex; gap: 2rem; flex-wrap: wrap; }
.columnas > section { flex: 1 1 20rem; }
</style>
