<script setup>
import { EtiquetaEstado } from '@catalogo/ui' // nunca '@catalogo/ui/src/...'

const productos = [
  { id: 1, nombre: 'Teclado', estado: 'activo' },
  { id: 2, nombre: 'Monitor', estado: 'agotado' },
  { id: 3, nombre: 'Ratón', estado: 'pendiente' }
]
</script>

<template>
  <h2>Catálogo</h2>
  <ul>
    <li v-for="producto in productos" :key="producto.id">
      {{ producto.nombre }} <EtiquetaEstado :estado="producto.estado" />
    </li>
  </ul>
</template>
