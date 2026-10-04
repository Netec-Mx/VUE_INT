<script setup>
import { storeToRefs } from 'pinia'
import { useFavoritosStore } from './stores/favoritos.js'

const store = useFavoritosStore()

// storeToRefs mantiene la reactividad de state y getters al desestructurar.
// Si se hiciera "const { favoritos } = store", la lista quedaría congelada.
const { favoritos } = storeToRefs(store)
const { cantidad } = storeToRefs(store)

// Las actions sí se pueden desestructurar directo: no son reactivas.
const { agregar, quitar, limpiar } = store

const catalogo = [
  { id: 'p1', nombre: 'Café Huila' },
  { id: 'p2', nombre: 'Café Nariño' },
  { id: 'p3', nombre: 'Café Sierra Nevada' },
]
</script>

<template>
  <main>
    <h1>Ejercicio 1 - de Vuex a Pinia</h1>

    <p>Favoritos guardados: {{ cantidad }}</p>

    <ul>
      <li v-for="producto in catalogo" :key="producto.id">
        {{ producto.nombre }}
        <button :disabled="store.esFavorito(producto.id)" @click="agregar(producto.id)">
          Agregar a favoritos
        </button>
        <button v-if="store.esFavorito(producto.id)" @click="quitar(producto.id)">Quitar</button>
      </li>
    </ul>

    <h2>Lista reactiva</h2>
    <p v-if="favoritos.length === 0">Todavía no hay favoritos.</p>
    <ul v-else>
      <li v-for="id in favoritos" :key="id">{{ id }}</li>
    </ul>

    <button :disabled="cantidad === 0" @click="limpiar()">Limpiar ($reset)</button>
  </main>
</template>
