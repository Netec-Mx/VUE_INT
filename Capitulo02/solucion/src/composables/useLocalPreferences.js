import { ref, watch } from 'vue'                        // caja vigilada y observador

export function useLocalPreferences(clave, inicial = false) { // clave con la que se guarda en el navegador
  const guardado = localStorage.getItem(clave)          // lo que quedó de la visita anterior, o null
  const valor = ref(guardado === null ? inicial : guardado === 'true') // el texto 'true' pasa a booleano
  watch(valor, (nuevo) => localStorage.setItem(clave, String(nuevo)))  // efecto: guarda cada cambio
  return valor                                          // entrega la caja: se usa con v-model
}
