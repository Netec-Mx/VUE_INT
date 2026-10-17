<!-- Renderless: no dibuja nada propio; entrega la lista y sus acciones por el slot -->
<script setup>
import { useProjectHubContext } from './keys.js'        // composable que lee el contexto
const { visibles, cargando, error, seleccionar } = useProjectHubContext() // toma solo lo que va a entregar
</script>

<template>
  <slot :lista="visibles" :cargando :error :seleccionar /> <!-- :cargando es la forma corta de :cargando="cargando" -->
</template>
