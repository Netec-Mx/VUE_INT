// Contadores de dibujos: cuentan cuántas veces Vue vuelve a dibujar cada parte.
// No hace falta modificar este archivo; solo se usa para medir.
import { reactive } from 'vue'

const cuentas = { tarjetas: 0, lista: 0, filtro: 0 }   // números de trabajo, sin vigilancia de Vue

export const dibujos = reactive({ ...cuentas })        // copia vigilada que se muestra en pantalla

// Suma 1 al contador indicado. La pantalla se actualiza un instante después,
// para que medir no provoque dibujos extra.
export function contar(nombre) {
  cuentas[nombre]++
  queueMicrotask(() => { dibujos[nombre] = cuentas[nombre] })
}

// Pone todos los contadores en cero antes de una medición
export function reiniciar() {
  for (const nombre in cuentas) {
    cuentas[nombre] = 0
    dibujos[nombre] = 0
  }
}
