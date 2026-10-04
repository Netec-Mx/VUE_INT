<script setup>
// Componente profundo: antes recibía "tema" e "idioma" como props reenviadas por
// cuatro niveles que no las usaban. Ahora las inyecta directamente del ancestro.
// El valor por defecto evita el "Cannot destructure property of undefined".
import { inject } from 'vue'
import { claveTema, claveIdioma } from './keys.js'

const { tema, cambiarTema } = inject(claveTema, { tema: { value: 'claro' }, cambiarTema: () => {} })
const idioma = inject(claveIdioma, 'es-CO')
</script>

<template>
  <footer>
    <span>Tema actual: {{ tema }} - idioma: {{ idioma }}</span>
    <button @click="cambiarTema">Cambiar tema</button>
  </footer>
</template>

<style scoped>
footer { display: flex; gap: 0.5rem; align-items: center; margin-top: 1rem; font-size: 0.85rem; }
</style>
