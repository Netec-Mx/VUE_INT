<script setup>
// Ejercicio 2: fuga de reactividad y su arreglo.
// Las dos versiones se montan lado a lado para comparar el mismo gesto del usuario.
import VersionRota from './VersionRota.vue'
import VersionCorregida from './VersionCorregida.vue'
</script>

<template>
  <section>
    <h1>Ejercicio 2 - Fuga de reactividad y su arreglo</h1>
    <p>
      Escriba en los dos campos. El de arriba no responde; el de abajo sí, con la misma
      desestructuración en el componente.
    </p>

    <VersionRota />
    <hr />
    <VersionCorregida />

    <h2>Dónde se rompía la cadena</h2>
    <p>
      En <code>VersionRota.vue</code>, en la línea
      <code>let { texto, resultados } = estado</code>. El getter del proxy se ejecuta una sola vez,
      durante esa desestructuración, y fuera de cualquier efecto de render útil: lo que queda en
      <code>texto</code> es una cadena primitiva desconectada del proxy.
    </p>
    <p>
      La corrección vive en el composable, no en el componente:
      <code>useFiltro()</code> devuelve un objeto plano con refs, y un ref sobrevive a la
      desestructuración porque el valor viaja dentro de <code>.value</code>, con su getter y su
      setter intactos.
    </p>
  </section>
</template>
