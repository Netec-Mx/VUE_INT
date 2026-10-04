<script setup>
// Ejercicio 2: distinguir memoización real de memoización aparente.
// Las dos versiones reciben el MISMO contador y cuentan cuántas veces se dispara su watchEffect.
// El botón "sumar 2" cambia el contador sin cambiar la paridad: ahí se ve la diferencia.
import { ref } from 'vue'
import MemoFalsa from './components/MemoFalsa.vue'
import MemoEstable from './components/MemoEstable.vue'

const contador = ref(0)

function sumarDos() {
  contador.value += 2
}

function sumarUno() {
  contador.value += 1
}
</script>

<template>
  <h1>Memoización real contra memoización aparente</h1>

  <p>Contador: <strong>{{ contador }}</strong> (par: {{ contador % 2 === 0 }})</p>
  <button @click="sumarDos">Sumar 2 (la paridad NO cambia)</button>
  <button @click="sumarUno">Sumar 1 (la paridad SÍ cambia)</button>

  <MemoFalsa :contador="contador" />
  <MemoEstable :contador="contador" />

  <section>
    <h2>Qué se debe observar</h2>
    <ol>
      <li>Pulse "Sumar 2" cinco veces y mire la consola del navegador.</li>
      <li>
        La versión aparente registra cinco disparos de más: su computed crea un objeto nuevo cada vez
        y Vue, que compara por identidad, considera que el valor cambió.
      </li>
      <li>
        La versión real se queda en su primer disparo: al devolver el objeto anterior cuando la paridad
        no cambió, la identidad se conserva y la propagación se corta.
      </li>
      <li>
        Pulse "Sumar 1": ahí sí cambia la paridad y las dos versiones se disparan, como corresponde.
      </li>
    </ol>
  </section>
</template>
