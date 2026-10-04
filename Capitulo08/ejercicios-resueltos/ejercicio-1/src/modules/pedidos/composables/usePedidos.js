import { ref, computed } from 'vue'

const pedidos = ref([
  { id: 101, clienteId: 1, valor: 850000 },
  { id: 102, clienteId: 2, valor: 1240000 },
  { id: 103, clienteId: 1, valor: 430000 }
])

export function usePedidos() {
  const total = computed(() => pedidos.value.length)
  const valorTotal = computed(() => pedidos.value.reduce((suma, p) => suma + p.valor, 0))

  return { pedidos, total, valorTotal }
}
