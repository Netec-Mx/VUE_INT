<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from './stores/user.js'
import { api } from './api.js'

const store = useUserStore()
const { pedidos, loading, error, nombre } = storeToRefs(store)
const { total, valorAcumulado } = storeToRefs(store)

// Interruptor para forzar el fallo del servidor simulado y comprobar
// que loading regresa a false, que es lo que pide el enunciado.
const forzarFallo = ref(false)

async function cargar() {
  api.modoFalla = forzarFallo.value
  try {
    await store.cargar()
  } catch {
    // El mensaje ya quedó en store.error; aquí solo se evita la promesa sin capturar.
  }
}

const pesos = (valor) => valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
</script>

<template>
  <main>
    <h1>Ejercicio 2 - store corregido</h1>

    <label>
      Nombre del usuario:
      <input v-model="nombre" placeholder="Andrés" />
    </label>

    <p>
      <label>
        <input v-model="forzarFallo" type="checkbox" />
        Forzar error en api.getPedidos()
      </label>
    </p>

    <button :disabled="loading" @click="cargar">
      {{ loading ? 'Cargando...' : 'Cargar pedidos' }}
    </button>

    <p>loading = {{ loading }} (tras un fallo debe quedar en false)</p>
    <p v-if="error" role="alert">Error: {{ error }}</p>

    <h2>Pedidos: {{ total }}</h2>
    <ul>
      <li v-for="pedido in pedidos" :key="pedido.id">
        #{{ pedido.id }} - {{ pedido.fecha }} - {{ pesos(pedido.valor) }}
      </li>
    </ul>
    <p>Valor acumulado: {{ pesos(valorAcumulado) }}</p>
  </main>
</template>
