import { computed, ref } from 'vue'
import { ejecutar } from './transporte'
import { escribir, leerVarias } from './almacenNormalizado'

// __typename viaja siempre en la consulta: sin él la tabla no podría identificar los objetos.
const CONSULTA = `
  query ProductosDestacados {
    destacados { __typename id nombre precio }
  }
`

const MUTACION = `
  mutation ActualizarPrecio($id: ID!, $precio: Int!) {
    actualizarPrecio(id: $id, precio: $precio) { __typename id nombre precio }
  }
`

export function useProductosGql() {
  const referencias = ref([])
  const cargando = ref(false)
  const error = ref(null)

  // La vista lee siempre de la tabla, nunca de una copia local de la respuesta.
  const resultado = computed(() => leerVarias(referencias.value))

  async function consultar() {
    cargando.value = true
    error.value = null
    try {
      const datos = await ejecutar(CONSULTA)
      referencias.value = escribir(datos.destacados)
    } catch (problema) {
      error.value = { tipo: problema.tipo ?? 'red', mensaje: problema.message }
    } finally {
      cargando.value = false
    }
  }

  // No hay código de sincronización: la mutación devuelve la entidad con su identificador
  // y al escribirla en la tabla se actualizan todas las vistas que la muestran.
  async function actualizarPrecio(id, precio) {
    error.value = null
    try {
      const datos = await ejecutar(MUTACION, { id, precio })
      escribir([datos.actualizarPrecio])
    } catch (problema) {
      error.value = { tipo: problema.tipo ?? 'red', mensaje: problema.message }
    }
  }

  return { resultado, cargando, error, consultar, actualizarPrecio }
}
