<script setup>
// Proveedor del laboratorio: entrega el estado en readonly() junto con la función
// que lo modifica, de modo que la mutación vive aquí y se puede rastrear.
import { provide, ref, readonly } from 'vue'
import { claveTema, claveIdioma } from './keys.js'
import Contador from './Contador.vue'
import ListaEnvios from './ListaEnvios.vue'

const tema = ref('claro')
function cambiarTema() {
  tema.value = tema.value === 'claro' ? 'oscuro' : 'claro'
}

provide(claveTema, { tema: readonly(tema), cambiarTema })
provide(claveIdioma, 'es-CO')
</script>

<template>
  <main :data-tema="tema">
    <h1>Capítulo 2 - Composition API</h1>

    <article>
      <h2>Ejemplo comentado: useContador</h2>
      <Contador :paso-inicial="2" />
    </article>

    <hr />

    <article>
      <h2>Laboratorio: ListaEnvios refactorizado</h2>
      <ListaEnvios />
    </article>
  </main>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
main { max-width: 46rem; margin: 0 auto; padding: 1rem; }
main[data-tema='oscuro'] { background: #16181d; color: #f2f3f5; }
</style>
