import { ref, computed } from 'vue'

const clientes = ref([
  { id: 1, nombre: 'Cooperativa del Norte', ciudad: 'Medellín' },
  { id: 2, nombre: 'Transportes del Valle', ciudad: 'Cali' }
])

export function useClientes() {
  const total = computed(() => clientes.value.length)
  const buscarPorId = (id) => clientes.value.find((c) => c.id === id) ?? null
  const nombrePorId = (id) => buscarPorId(id)?.nombre ?? 'Cliente desconocido'

  return { clientes, total, buscarPorId, nombrePorId }
}
