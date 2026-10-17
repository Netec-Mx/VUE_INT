<template>
  <main>
    <h1>Acceso prohibido</h1>
    <p>Tu rol no tiene permiso para ver esa página.</p>
    <RouterLink :to="{ name: 'dashboard' }">Volver al tablero</RouterLink>
  </main>
</template>
