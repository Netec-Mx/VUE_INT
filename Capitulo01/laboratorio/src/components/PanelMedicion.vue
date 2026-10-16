<script setup>
// Panel de medición: muestra los contadores de dibujos. No hace falta modificarlo.
import { dibujos, reiniciar } from '../medicion.js'
</script>

<template>
  <aside class="medicion" aria-live="polite">
    <h2>Medición</h2>
    <dl>
      <div><dt>Dibujos de tarjetas</dt><dd data-prueba="tarjetas">{{ dibujos.tarjetas }}</dd></div>
      <div><dt>Dibujos de la lista</dt><dd data-prueba="lista">{{ dibujos.lista }}</dd></div>
      <div><dt>Cálculos del filtro</dt><dd data-prueba="filtro">{{ dibujos.filtro }}</dd></div>
    </dl>
    <button type="button" @click="reiniciar">Reiniciar contadores</button>
  </aside>
</template>
