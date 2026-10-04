import { ref, computed, toValue } from 'vue'

// SOLUCIÓN DEL EJERCICIO 3, parte lógica.
// useTabla no toca el DOM ni sabe cómo se ve nada: solo ordena, pagina y lleva
// la selección. Por eso sirve igual para una tabla, para una lista de tarjetas
// o para una exportación a CSV.
export function useTabla(filas, opciones = {}) {
  const porPagina = ref(opciones.porPagina ?? 5)
  const campoOrden = ref(opciones.campoOrden ?? null)
  const direccionOrden = ref('asc')
  const pagina = ref(1)
  const seleccionadas = ref(new Set())
  const clave = opciones.clave ?? 'id'

  const origen = computed(() => toValue(filas) ?? [])

  const ordenadas = computed(() => {
    const lista = [...origen.value]
    if (!campoOrden.value) return lista
    const signo = direccionOrden.value === 'asc' ? 1 : -1
    return lista.sort((a, b) => {
      const x = a[campoOrden.value]
      const y = b[campoOrden.value]
      if (typeof x === 'number' && typeof y === 'number') return (x - y) * signo
      return String(x).localeCompare(String(y), 'es-CO') * signo
    })
  })

  const totalPaginas = computed(() =>
    Math.max(1, Math.ceil(ordenadas.value.length / porPagina.value))
  )

  const filasPagina = computed(() => {
    const inicio = (pagina.value - 1) * porPagina.value
    return ordenadas.value.slice(inicio, inicio + porPagina.value)
  })

  const vacia = computed(() => ordenadas.value.length === 0)

  function ordenarPor(campo) {
    if (campoOrden.value === campo) {
      direccionOrden.value = direccionOrden.value === 'asc' ? 'desc' : 'asc'
    } else {
      campoOrden.value = campo
      direccionOrden.value = 'asc'
    }
    pagina.value = 1
  }

  function irA(destino) {
    pagina.value = Math.min(Math.max(1, destino), totalPaginas.value)
  }

  function estaSeleccionada(fila) {
    return seleccionadas.value.has(fila[clave])
  }

  function alternarSeleccion(fila) {
    const copia = new Set(seleccionadas.value)
    if (copia.has(fila[clave])) copia.delete(fila[clave])
    else copia.add(fila[clave])
    seleccionadas.value = copia
  }

  function limpiarSeleccion() {
    seleccionadas.value = new Set()
  }

  return {
    pagina, porPagina, totalPaginas, filasPagina, vacia,
    campoOrden, direccionOrden, ordenarPor, irA,
    seleccionadas, estaSeleccionada, alternarSeleccion, limpiarSeleccion
  }
}
