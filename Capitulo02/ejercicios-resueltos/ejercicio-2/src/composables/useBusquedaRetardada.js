import { ref, watchEffect, toValue, onUnmounted } from 'vue'

// SOLUCIÓN DEL EJERCICIO 2.
// Entrada: "termino" puede ser un string fijo, un ref o un getter; toValue() lo
// normaliza, así que el composable no necesita saber cuál de los tres recibió.
// Salida: { terminoAplicado }, un ref que solo cambia cuando el usuario deja de
// escribir durante "retardo" milisegundos.
// Limpieza: cada ejecución del efecto cancela el temporizador anterior con
// onCleanup, y onUnmounted cancela el que quede pendiente al desmontar; por eso
// nunca se actualiza un componente ya desmontado.
export function useBusquedaRetardada(termino, retardo = 300) {
  const terminoAplicado = ref(toValue(termino))
  let temporizador = null

  function cancelar() {
    if (temporizador !== null) {
      clearTimeout(temporizador)
      temporizador = null
    }
  }

  watchEffect((onCleanup) => {
    const actual = toValue(termino)
    onCleanup(cancelar)
    temporizador = setTimeout(() => {
      terminoAplicado.value = actual
      temporizador = null
    }, retardo)
  })

  onUnmounted(cancelar)

  return { terminoAplicado }
}
