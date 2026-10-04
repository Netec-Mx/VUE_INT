<script setup>
// Este componente representa la parte "pesada" de la pantalla: solo se descarga cuando hace falta.
import { computed } from 'vue'

const props = defineProps({
  pedido: { type: Object, required: true }
})

// Formateo de moneda: es intencionalmente un poco caro y por eso se memoiza con computed.
const valorFormateado = computed(() =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(props.pedido.valor)
)
</script>

<template>
  <div class="detalle">
    <h3>Detalle del pedido {{ pedido.id }}</h3>
    <p>Cliente: {{ pedido.cliente }}</p>
    <p>Ciudad: {{ pedido.ciudad }}</p>
    <p>Estado: {{ pedido.estado }}</p>
    <p>Valor: {{ valorFormateado }}</p>
  </div>
</template>

<style scoped>
.detalle {
  border: 1px solid #ccc;
  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
}
</style>
