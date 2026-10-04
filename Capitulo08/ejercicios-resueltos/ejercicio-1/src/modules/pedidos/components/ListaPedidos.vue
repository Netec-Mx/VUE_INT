<script setup>
import { usePedidos } from '../composables/usePedidos.js'
// IMPORTACIÓN CORRECTA: se entra por el index.js del otro módulo, nunca por sus archivos internos.
import { useClientes } from '@/modules/clientes'

const { pedidos, total, valorTotal } = usePedidos()
const { nombrePorId } = useClientes()

const formato = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })
</script>

<template>
  <section class="modulo">
    <h2>Pedidos ({{ total }})</h2>
    <ul>
      <li v-for="pedido in pedidos" :key="pedido.id">
        #{{ pedido.id }} - {{ nombrePorId(pedido.clienteId) }} -
        {{ formato.format(pedido.valor) }}
      </li>
    </ul>
    <p class="total">Valor total: {{ formato.format(valorTotal) }}</p>
  </section>
</template>

<style scoped>
.modulo {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 1rem;
}
.total {
  font-weight: 600;
}
</style>
