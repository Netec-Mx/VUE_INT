<script>
// ============================================================
// PARTE 2: un componente que usa el composable (Contador.vue)
// ============================================================
import { computed } from 'vue'                            // Traemos "computed" para armar un texto que se rehace solo.
import { useContador } from './composables/useContador.js' // Importamos el composable; cada componente que lo llame tiene su propio contador.

export default {                                          // Definimos el componente como un objeto normal de JavaScript.
  props: { pasoInicial: { type: Number, default: 1 } },   // Declaramos que quien nos use puede indicarnos de cuánto en cuánto avanzar.

  setup(props) {                                          // "setup" es donde vive toda la lógica; se ejecuta una sola vez, antes de dibujar nada.
    const contador = useContador(props.pasoInicial)       // Creamos nuestro propio contador usando el composable y le pasamos el paso recibido.
    const mensaje = computed(() =>                        // Armamos un texto que se rehace solo cada vez que cambia el estado del contador.
      contador.esPar.value ? 'Número par' : 'Número impar' // Si el número es par decimos una cosa; si no, la otra.
    )                                                     // Fin del texto calculado.

    return { ...contador, mensaje }                       // Entregamos a la plantilla todo lo del contador más el mensaje; el template los usa sin escribir ".value".
  }                                                       // Fin de setup.
}                                                         // Fin del componente.
</script>

<template>
  <div class="contador">
    <p>{{ valor }} - {{ mensaje }}</p>                    <!-- Mostramos el número actual y si es par o impar. -->
    <button @click="sumar">Sumar {{ paso }}</button>      <!-- Botón que llama a la función del composable para aumentar el contador. -->
    <button @click="reiniciar">Reiniciar</button>         <!-- Botón que devuelve el contador a cero. -->
    <small>Atajos: flecha arriba suma, Escape reinicia.</small>
  </div>
</template>

<style scoped>
.contador { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
</style>
