<script setup>
// Después del refactor: ni axios ni fetch aparecen en este archivo.
import { useProducto } from '../composables/useProducto'

const props = defineProps({ id: { type: Number, required: true } })

// Se pasa un getter, no props.id directo: así el composable reacciona cuando el id cambia.
const { datos, cargando, error } = useProducto(() => props.id)
</script>

<template>
  <section>
    <h2>Después: la lógica vive en el composable</h2>
    <p v-if="cargando">Cargando producto {{ id }}...</p>
    <p v-else-if="error" role="alert">{{ error.mensaje }} ({{ error.tipo }})</p>
    <article v-else-if="datos">
      <h3>{{ datos.title }}</h3>
      <p>{{ datos.body }}</p>
    </article>
  </section>
</template>
