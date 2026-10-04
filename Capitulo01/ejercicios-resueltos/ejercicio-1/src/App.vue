<script setup>
// Ejercicio 1: "Del proxy al render".
// La plantilla lee ÚNICAMENTE estado.a, así que solo estado.a queda rastreada (track)
// como dependencia del efecto de render. Al escribir estado.b hay trigger, pero la lista
// de suscriptores de la clave "b" está vacía: nadie se entera y no hay re-render.
import { reactive, onRenderTriggered, ref } from 'vue'

const estado = reactive({ a: 1, b: 2 })

// Bitácora visible en pantalla, para no depender solo de la consola del navegador.
const bitacora = ref([])

onRenderTriggered((e) => {
  const linea = `re-render por: key=${String(e.key)} type=${e.type}`
  console.log(linea)
  // Se escribe con push sobre un ref de arreglo: no participa del render de estado.a,
  // pero sí se muestra en pantalla porque la plantilla también lee la bitácora.
  bitacora.value.push(linea)
})

function incrementarA() {
  // Escritura sobre una clave rastreada: dispara el efecto de render.
  estado.a++
}

function incrementarB() {
  // Escritura sobre una clave que la plantilla nunca leyó: no hay efectos suscritos.
  estado.b++
}
</script>

<template>
  <section>
    <h1>Ejercicio 1 - Del proxy al render</h1>

    <!-- La plantilla lee solo estado.a. estado.b jamás se lee aquí. -->
    <p>estado.a = {{ estado.a }}</p>

    <button @click="incrementarA">Incrementar a</button>
    <button @click="incrementarB">Incrementar b</button>

    <h2>Bitácora de onRenderTriggered</h2>
    <p v-if="bitacora.length === 0">Sin re-renders todavía.</p>
    <ol>
      <li v-for="(linea, i) in bitacora" :key="i">{{ linea }}</li>
    </ol>

    <h2>Explicación</h2>
    <p>
      Al renderizar, Vue ejecuta la función de render como efecto activo. Al leer
      <code>estado.a</code> el proxy ejecuta <strong>track</strong> y anota ese efecto en
      <code>WeakMap&lt;estado&gt; -&gt; Map&lt;'a'&gt; -&gt; Set&lt;efecto de render&gt;</code>.
      La clave <code>'b'</code> nunca se lee, así que su conjunto de suscriptores queda vacío.
    </p>
    <p>
      Al pulsar "Incrementar a", la escritura ejecuta <strong>trigger</strong> sobre la clave
      <code>'a'</code>, encuentra el efecto de render y lo vuelve a correr: aparece una línea en la
      bitácora. Al pulsar "Incrementar b" también hay <strong>trigger</strong>, pero sobre la clave
      <code>'b'</code>, cuyo conjunto está vacío: no hay a quién avisar y no se registra nada.
    </p>
  </section>
</template>
