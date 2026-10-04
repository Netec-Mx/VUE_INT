<script setup>
import { ref, watch } from 'vue'
import { buscarPedido } from '../datos'

// El id llega como prop gracias a props: true; nunca se lee $route aquí.
const props = defineProps({ id: { type: String, required: true } })

const pedido = ref(null)

// El componente se reutiliza al pasar de /tienda/pedidos/1 a /2: el watch inmediato
// vuelve a consultar y evita el dato viejo que dejaría un onMounted.
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
