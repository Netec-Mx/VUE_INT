import { ref, computed, toValue } from 'vue'

// Paso 4 del laboratorio.
// Entradas: listaRef (valor, ref o getter) y los campos por los que se busca.
// Salidas: { termino, resultados }. El estado vive DENTRO de la función, así que
// dos pantallas que llamen useFiltro() no comparten el término de búsqueda.
export function useFiltro(listaRef, campos = []) {
  const termino = ref('')

  const resultados = computed(() => {
    const lista = toValue(listaRef) ?? []
    const buscado = termino.value.trim().toLowerCase()
    if (!buscado) return lista

    return lista.filter((fila) =>
      campos.some((campo) => String(fila[campo] ?? '').toLowerCase().includes(buscado))
    )
  })

  return { termino, resultados }
}
