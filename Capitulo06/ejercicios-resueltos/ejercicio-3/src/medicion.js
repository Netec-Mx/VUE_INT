import { ref, nextTick } from 'vue'

// Instrumento de medición del ejercicio: cronometra el trabajo de JavaScript y de render
// que desata un cambio de estado, y cuenta los nodos del DOM que quedaron dentro del contenedor.
// El tiempo se toma con performance.now(), el mismo reloj que usa el panel Performance.
export function usarMedicion() {
  const milisegundos = ref(0)
  const nodos = ref(0)

  async function medir(cambiarEstado, contenedor) {
    const inicio = performance.now()
    // 1. Se aplica el cambio de estado (por ejemplo, escribir un carácter en el buscador).
    cambiarEstado()
    // 2. Se espera a que Vue termine de aplicar el cambio en el DOM.
    await nextTick()
    // 3. Se cierra el cronómetro: aquí está el costo real de esa pulsación.
    milisegundos.value = Number((performance.now() - inicio).toFixed(2))
    nodos.value = contenedor ? contenedor.querySelectorAll('*').length : 0
  }

  return { milisegundos, nodos, medir }
}
