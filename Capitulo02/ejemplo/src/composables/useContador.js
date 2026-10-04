// ============================================================
// PARTE 1: el composable reutilizable (archivo: useContador.js)
// ============================================================

import { ref, computed, onMounted, onUnmounted } from 'vue' // Traemos de Vue las herramientas: crear datos que reaccionan, valores derivados y avisos de ciclo de vida.

export function useContador(pasoInicial = 1) {            // Declaramos la función reutilizable; "paso" es cuánto sube cada vez, y vale 1 si no nos dicen otra cosa.
  const valor = ref(0)                                    // "valor" guarda el número actual; al ser un ref, la pantalla se entera sola cuando cambia.
  const paso = ref(pasoInicial)                           // "paso" guarda de cuánto en cuánto avanza el contador; también reacciona a cambios.
  const esPar = computed(() => valor.value % 2 === 0)     // "esPar" se calcula solo a partir de "valor" y se recalcula únicamente cuando "valor" cambia.

  function sumar() {                                      // Función que aumenta el contador.
    valor.value += paso.value                             // Le sumamos el paso al valor actual; ".value" es la forma de leer y escribir un ref fuera de la plantilla.
  }                                                       // Fin de la función sumar.

  function reiniciar() {                                  // Función que devuelve el contador a cero.
    valor.value = 0                                       // Ponemos el valor en cero; la pantalla se actualiza sola.
  }                                                       // Fin de la función reiniciar.

  function alPresionarTecla(evento) {                     // Función que decide qué hacer cuando el usuario presiona una tecla.
    if (evento.key === 'ArrowUp') sumar()                 // Si la tecla fue la flecha hacia arriba, aumentamos el contador.
    if (evento.key === 'Escape') reiniciar()              // Si la tecla fue Escape, lo devolvemos a cero.
  }                                                       // Fin de la función alPresionarTecla.

  onMounted(() => {                                       // Este bloque se ejecuta justo cuando el componente ya aparece en la pantalla.
    window.addEventListener('keydown', alPresionarTecla)  // Le pedimos al navegador que nos avise cada vez que se presione una tecla.
  })                                                      // Fin del aviso de "ya apareció en pantalla".

  onUnmounted(() => {                                     // Este bloque se ejecuta cuando el componente desaparece de la pantalla.
    window.removeEventListener('keydown', alPresionarTecla) // Cancelamos el aviso de teclas; si no lo hacemos, queda consumiendo memoria para siempre.
  })                                                      // Fin del aviso de "ya desapareció".

  return { valor, paso, esPar, sumar, reiniciar }         // Entregamos un objeto normal con datos y funciones; se puede repartir en variables sin perder la reacción automática.
}                                                         // Fin del composable: cualquier componente puede importarlo y tener su propio contador independiente.
