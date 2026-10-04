<script setup>
import { ref, watch } from 'vue'
import { buscarPedido } from '../datos'

// Queda en su propio chunk: solo se descarga al abrir el detalle de un pedido.
const props = defineProps({ id: { type: String, required: true } })

const pedido = ref(null)

watch(
  () => props.id,
  (nuevo) => {
    pedido.value = buscarPedido(nuevo)
  },
  { immediate: true },
)
</script>

<template>
  <section>
    <h2>Pedido {{ id }}</h2>
    <dl v-if="pedido">
      <dt>Cliente</dt>
      <dd>{{ pedido.cliente }}</dd>
      <dt>Total</dt>
      <dd>{{ pedido.total.toLocaleString('es-CO') }}</dd>
      <dt>Estado</dt>
      <dd>{{ pedido.estado }}</dd>
    </dl>
    <p v-else>No existe el pedido {{ id }}.</p>
  </section>
</template>
