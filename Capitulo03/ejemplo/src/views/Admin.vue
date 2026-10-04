<script setup>
// Solo llega aquí quien tiene rol admin: el guard global lo verificó con to.meta.roles.
const usuarios = [
  { nombre: 'andres', role: 'admin' },
  { nombre: 'lucia', role: 'operador' },
]
</script>

<template>
  <section>
    <h1>Administración</h1>
    <ul>
      <li v-for="u in usuarios" :key="u.nombre">{{ u.nombre }} - {{ u.role }}</li>
    </ul>
  </section>
</template>
