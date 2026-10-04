<script setup>
// Primera versión: se desestructura el objeto reactive devuelto por el composable.
// Ahí, exactamente, se rompe la cadena de dependencias.
import { useFiltroRoto } from './composables.js'

const { estado, buscar } = useFiltroRoto()

// LÍNEA QUE ROMPE LA REACTIVIDAD:
// "texto" queda como una copia primitiva del valor actual y "resultados" como una
// referencia al arreglo que había en ese instante. La plantilla lee estas variables
// locales, no el proxy, así que nunca se ejecuta track sobre estado.texto.
let { texto, resultados } = estado

function alEscribir(evento) {
  // Actualizamos el proxy (correcto) y además las variables locales (inútil para el render).
  buscar(evento.target.value)
  texto = estado.texto
  resultados = estado.resultados
  // La consola demuestra que el dato sí cambió: lo que falla es el aviso al render.
  console.log('rota -> proxy:', estado.texto, '| copia local:', texto)
}
</script>

<template>
  <article>
    <h2>Versión rota</h2>
    <input :value="texto" placeholder="Escriba aquí" @input="alEscribir" />
    <p>Texto mostrado: "{{ texto }}"</p>
    <ul>
      <li v-for="r in resultados" :key="r">{{ r }}</li>
    </ul>
    <p>
      La vista no se mueve: la plantilla depende de variables locales copiadas en la
      desestructuración, no del proxy. Sin lectura del proxy no hay <code>track</code>, y sin
      <code>track</code> el <code>trigger</code> de <code>buscar()</code> no tiene a quién avisar.
    </p>
  </article>
</template>
