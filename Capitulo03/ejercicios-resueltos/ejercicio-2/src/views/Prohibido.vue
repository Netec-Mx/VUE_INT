<script setup>
import { useAuth } from '../stores/auth'

const auth = useAuth()
</script>

<template>
  <section>
    <h2>403 - Acceso restringido</h2>
    <p>El rol actual ({{ auth.rol ?? 'visitante' }}) no tiene permiso sobre esa pantalla.</p>
    <RouterLink :to="{ name: 'catalogo' }">Volver al catálogo</RouterLink>
  </section>
</template>
