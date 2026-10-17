// Contadores de dibujos: cuántas veces Vue vuelve a dibujar cada parte. Cópialo tal cual.
import { reactive } from 'vue'

const cuentas = { tarjetas: 0, lista: 0, filtro: 0 }  // números de trabajo, sin vigilancia de Vue
export const dibujos = reactive({ ...cuentas })       // copia vigilada que se ve en pantalla

export function contar(nombre) {                      // suma 1 al contador indicado
  cuentas[nombre]++
  queueMicrotask(() => { dibujos[nombre] = cuentas[nombre] }) // pinta un instante después: medir no causa dibujos extra
}

export function reiniciar() {                         // pone todo en cero antes de medir
  for (const nombre in cuentas) { cuentas[nombre] = 0; dibujos[nombre] = 0 }
}
