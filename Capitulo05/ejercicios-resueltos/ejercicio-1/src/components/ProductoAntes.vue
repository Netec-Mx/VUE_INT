<script setup>
// Punto de partida del ejercicio, incluido solo como referencia de lo que se debe eliminar.
// Defectos: importa el cliente HTTP, no cancela nada y no reacciona al cambio de id.
import { onMounted, ref } from 'vue'
import { api } from '../api'

const props = defineProps({ id: { type: Number, required: true } })

const datos = ref(null)
const cargando = ref(false)
const error = ref(null)

onMounted(async () => {
  cargando.value = true
  try {
    const respuesta = await api.get(`/posts/${props.id}`)
    datos.value = respuesta.data
  } catch (fallo) {
    error.value = { tipo: 'servidor', mensaje: fallo.message }
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <section>
    <h2>Antes: la petición vive dentro del componente</h2>
    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error" role="alert">{{ error.mensaje }}</p>
    <article v-else-if="datos">
      <h3>{{ datos.title }}</h3>
      <p>Se quedó congelado en el id {{ id }} con el que se montó.</p>
    </article>
  </section>
</template>
