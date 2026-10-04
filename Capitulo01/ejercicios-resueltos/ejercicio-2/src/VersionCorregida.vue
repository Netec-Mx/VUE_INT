<script setup>
// Segunda versión: MISMA desestructuración en el componente.
// Lo único que cambió es el composable, que ahora devuelve un objeto plano con refs.
import { useFiltro } from './composables.js'

const { texto, resultados } = useFiltro()
</script>

<template>
  <article>
    <h2>Versión corregida</h2>
    <!-- v-model sobre un ref: el compilador escribe texto.value y el setter dispara trigger. -->
    <input v-model="texto" placeholder="Escriba aquí" />
    <p>Texto mostrado: "{{ texto }}"</p>
    <ul>
      <li v-for="r in resultados" :key="r">{{ r }}</li>
    </ul>
    <p>
      Aquí la desestructuración es inofensiva: <code>texto</code> sigue siendo el mismo objeto ref.
      La plantilla lee <code>texto.value</code>, se ejecuta <code>track</code> sobre ese ref, y al
      escribir en el input el setter ejecuta <code>trigger</code> y vuelve a correr el render.
    </p>
  </article>
</template>
