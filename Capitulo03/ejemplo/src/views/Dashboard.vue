<script setup>
import { useAuth } from '../stores/auth'

const auth = useAuth()
const indicadores = [
  { titulo: 'Pedidos del día', valor: 128 },
  { titulo: 'Despachos pendientes', valor: 14 },
  { titulo: 'Clientes activos', valor: 312 },
]
</script>

<template>
  <section>
    <h1>Tablero</h1>
    <p>Bienvenido, {{ auth.user?.nombre }}.</p>
    <ul>
      <li v-for="i in indicadores" :key="i.titulo">{{ i.titulo }}: {{ i.valor }}</li>
    </ul>
  </section>
</template>
