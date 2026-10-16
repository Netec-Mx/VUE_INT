<script setup>
// Barra de búsqueda: escribe en la consulta compartida
import { inject } from 'vue'                          // inject recibe lo que App compartió con provide
const { consulta } = inject('catalogo')               // toma solo el texto de búsqueda
</script>

<template>
  <div class="busqueda">
    <label for="buscar">Buscar producto</label>
    <!-- v-model une la caja de texto con la consulta: lo que se escribe la cambia -->
    <input id="buscar" v-model="consulta" type="search" placeholder="Ejemplo: cable" />
  </div>
</template>
