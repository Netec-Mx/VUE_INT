<script setup>
import VersionPinia from './components/VersionPinia.vue'
import VersionGraphql from './components/VersionGraphql.vue'
</script>

<template>
  <main>
    <h1>Ejercicio 3 - Normalizar y comprobarlo</h1>

    <p>
      En las dos versiones la misma entidad aparece en dos sitios a la vez, listado y panel de
      edición. Al guardar el precio, el listado cambia al instante y el contador de peticiones no
      sube por una recarga de la lista: sube solo por la escritura.
    </p>

    <VersionPinia />
    <VersionGraphql />

    <section class="explicacion">
      <h2>Por qué Apollo lo logra sin código de sincronización</h2>
      <p>
        Apollo no guarda respuestas sino objetos: parte cada resultado en entidades y le asigna a
        cada una un cache ID formado por <code>__typename</code> y <code>id</code>, por ejemplo
        <code>Producto:42</code>. Las consultas guardan referencias a esa clave, no copias.
      </p>
      <p>
        Cuando la mutación devuelve la entidad con su <code>id</code> y su <code>__typename</code>,
        Apollo calcula el mismo cache ID, sobrescribe ese único registro y toda vista que lo
        referencie se vuelve a pintar sola.
      </p>
      <p>
        El cache ID es entonces la bisagra: sin él Apollo no sabría que el objeto devuelto por la
        mutación y el que muestra el listado son el mismo, y guardaría dos copias sueltas.
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  max-width: 56rem;
  margin: 2rem auto;
}
section {
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
}
.explicacion {
  background: #fafafa;
}
</style>
