<script setup>
import { ref, computed } from 'vue'
import TablaDatos from './TablaDatos.vue'

// Justificación pedida por el enunciado (cinco líneas).
const justificacion = [
  'La paginación, el orden por columna y la selección de filas viven en useTabla(), porque son lógica con estado que no depende de cómo se pinte nada.',
  'useTabla() no toca el DOM: solo expone refs y funciones, así que la misma lógica sirve para una tabla, para tarjetas o para una exportación.',
  'La presentación se entrega por scoped slots nombrados (#encabezado, #celda y #vacio), porque cada pantalla necesita decidir el formato de cada celda y el mensaje de vacío.',
  'El componente aporta estructura visual (encabezado, cuerpo, estado vacío, pie de paginación), que es justamente el caso en que los slots ganan sobre un composable solo.',
  'No se usó un HOC porque habría agregado una instancia de componente extra y habría oscurecido el origen de las props, sin resolver nada que el composable no resuelva ya.'
]

const filas = ref([
  { id: 1, cliente: 'Ana Ruiz', ciudad: 'Bogotá', valor: 320000, estado: 'Entregado' },
  { id: 2, cliente: 'Carlos Mena', ciudad: 'Medellín', valor: 1250000, estado: 'En tránsito' },
  { id: 3, cliente: 'Lucía Peña', ciudad: 'Cali', valor: 84000, estado: 'En bodega' },
  { id: 4, cliente: 'Jorge Silva', ciudad: 'Barranquilla', valor: 560000, estado: 'Devuelto' },
  { id: 5, cliente: 'Marta Gil', ciudad: 'Bogotá', valor: 2100000, estado: 'Entregado' },
  { id: 6, cliente: 'Pedro Lara', ciudad: 'Bucaramanga', valor: 45000, estado: 'En tránsito' },
  { id: 7, cliente: 'Sara Ríos', ciudad: 'Pereira', valor: 730000, estado: 'Entregado' }
])

const columnas = [
  { campo: 'cliente', titulo: 'Cliente' },
  { campo: 'ciudad', titulo: 'Ciudad' },
  { campo: 'valor', titulo: 'Valor' },
  { campo: 'estado', titulo: 'Estado' }
]

const vaciar = ref(false)
const datos = computed(() => (vaciar.value ? [] : filas.value))

const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
</script>

<template>
  <main>
    <h1>Ejercicio 3 - useTabla con scoped slots</h1>

    <button @click="vaciar = !vaciar">
      {{ vaciar ? 'Restaurar datos' : 'Simular lista vacía' }}
    </button>

    <TablaDatos :filas="datos" :columnas="columnas" :por-pagina="3">
      <template #encabezado="{ columna, campoOrden, direccion }">
        {{ columna.titulo }}
        <span v-if="campoOrden === columna.campo">{{ direccion === 'asc' ? '(asc)' : '(desc)' }}</span>
      </template>

      <template #celda="{ columna, valor }">
        <strong v-if="columna.campo === 'valor'">{{ pesos.format(valor) }}</strong>
        <span v-else>{{ valor }}</span>
      </template>

      <template #vacio>
        Esta pantalla decide su propio mensaje: no hay despachos registrados hoy.
      </template>
    </TablaDatos>

    <h2>Justificación del patrón elegido</h2>
    <ol><li v-for="(linea, i) in justificacion" :key="i">{{ linea }}</li></ol>
  </main>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
main { max-width: 52rem; margin: 0 auto; padding: 1rem; }
</style>
